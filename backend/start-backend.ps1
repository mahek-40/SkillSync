# SkillSync Backend Startup Script
# This script checks MongoDB and starts the backend

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "SkillSync Backend Startup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the backend directory
if (-not (Test-Path "app\main.py")) {
    Write-Host "✗ Error: Not in backend directory" -ForegroundColor Red
    Write-Host "Please run this script from the backend folder:" -ForegroundColor Yellow
    Write-Host "  cd D:\skillsync\backend" -ForegroundColor White
    Write-Host "  .\start-backend.ps1" -ForegroundColor White
    exit 1
}

# Check Python
Write-Host "Checking Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Python not found" -ForegroundColor Red
    Write-Host "Please install Python 3.8+ from https://www.python.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check dependencies
Write-Host "Checking dependencies..." -ForegroundColor Yellow
$fastapi = pip list 2>&1 | Select-String "fastapi"
if ($fastapi) {
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✗ Dependencies not installed" -ForegroundColor Red
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    pip install -r requirements.txt
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green
}

Write-Host ""

# Check MongoDB
Write-Host "Checking MongoDB..." -ForegroundColor Yellow

$mongoRunning = $false

# Check if MongoDB service exists and is running
try {
    $service = Get-Service -Name "MongoDB" -ErrorAction Stop
    if ($service.Status -eq "Running") {
        Write-Host "✓ MongoDB service is running" -ForegroundColor Green
        $mongoRunning = $true
    } else {
        Write-Host "⚠️  MongoDB service exists but is not running" -ForegroundColor Yellow
        Write-Host "Attempting to start MongoDB..." -ForegroundColor Yellow
        
        # Try to start MongoDB
        try {
            Start-Service -Name "MongoDB" -ErrorAction Stop
            Start-Sleep -Seconds 2
            $service = Get-Service -Name "MongoDB"
            if ($service.Status -eq "Running") {
                Write-Host "✓ MongoDB started successfully" -ForegroundColor Green
                $mongoRunning = $true
            }
        } catch {
            Write-Host "✗ Could not start MongoDB (need Administrator privileges)" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "⚠️  MongoDB service not found" -ForegroundColor Yellow
}

# Check if MongoDB is listening on port 27017
if (-not $mongoRunning) {
    $portCheck = netstat -an | Select-String "27017" | Select-String "LISTENING"
    if ($portCheck) {
        Write-Host "✓ MongoDB is listening on port 27017" -ForegroundColor Green
        $mongoRunning = $true
    }
}

if (-not $mongoRunning) {
    Write-Host ""
    Write-Host "==================================" -ForegroundColor Red
    Write-Host "MongoDB is NOT running!" -ForegroundColor Red
    Write-Host "==================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please choose an option:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Install MongoDB locally" -ForegroundColor Cyan
    Write-Host "  1. Download from: https://www.mongodb.com/try/download/community" -ForegroundColor White
    Write-Host "  2. Run installer as Administrator" -ForegroundColor White
    Write-Host "  3. Choose 'Complete' and 'Install as Service'" -ForegroundColor White
    Write-Host "  4. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Use MongoDB Atlas (Cloud)" -ForegroundColor Cyan
    Write-Host "  1. Sign up at: https://www.mongodb.com/cloud/atlas/register" -ForegroundColor White
    Write-Host "  2. Create a free cluster" -ForegroundColor White
    Write-Host "  3. Get connection string" -ForegroundColor White
    Write-Host "  4. Update .env file with your connection string" -ForegroundColor White
    Write-Host "  5. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 3: Start MongoDB manually" -ForegroundColor Cyan
    Write-Host "  Run as Administrator:" -ForegroundColor White
    Write-Host "    net start MongoDB" -ForegroundColor Gray
    Write-Host ""
    Write-Host "For detailed instructions, see:" -ForegroundColor Yellow
    Write-Host "  backend\INSTALL_MONGODB_NOW.md" -ForegroundColor White
    Write-Host ""
    
    $continue = Read-Host "Continue anyway? (Y/N)"
    if ($continue -ne "Y" -and $continue -ne "y") {
        exit 1
    }
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Starting Backend Server" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend will be available at:" -ForegroundColor Yellow
Write-Host "  http://localhost:5000" -ForegroundColor White
Write-Host ""
Write-Host "API Documentation:" -ForegroundColor Yellow
Write-Host "  http://localhost:5000/docs" -ForegroundColor White
Write-Host ""
Write-Host "Press CTRL+C to stop the server" -ForegroundColor Gray
Write-Host ""

# Start the backend
uvicorn app.main:app --reload --port 5000
