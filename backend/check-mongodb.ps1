# MongoDB Status Checker and Starter for Windows
# Run this script as Administrator

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "MongoDB Status Checker" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠️  WARNING: Not running as Administrator" -ForegroundColor Yellow
    Write-Host "Some operations may fail. Please run PowerShell as Administrator." -ForegroundColor Yellow
    Write-Host ""
}

# Check if MongoDB is installed
Write-Host "Checking MongoDB installation..." -ForegroundColor Yellow

$mongoPath = "C:\Program Files\MongoDB\Server"
$mongoInstalled = Test-Path $mongoPath

if ($mongoInstalled) {
    Write-Host "✓ MongoDB is installed at: $mongoPath" -ForegroundColor Green
    
    # Find MongoDB version
    $versions = Get-ChildItem $mongoPath -Directory | Sort-Object Name -Descending
    if ($versions.Count -gt 0) {
        $latestVersion = $versions[0].Name
        Write-Host "✓ MongoDB Version: $latestVersion" -ForegroundColor Green
        $mongoBinPath = "$mongoPath\$latestVersion\bin"
    }
} else {
    Write-Host "✗ MongoDB is NOT installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install MongoDB:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://www.mongodb.com/try/download/community" -ForegroundColor White
    Write-Host "2. Run the MSI installer as Administrator" -ForegroundColor White
    Write-Host "3. Choose 'Complete' installation" -ForegroundColor White
    Write-Host "4. Check 'Install MongoDB as a Service'" -ForegroundColor White
    Write-Host ""
    Write-Host "Or see: backend\MONGODB_WINDOWS_SETUP.md for detailed instructions" -ForegroundColor Cyan
    exit
}

Write-Host ""

# Check if MongoDB service exists
Write-Host "Checking MongoDB service..." -ForegroundColor Yellow

try {
    $service = Get-Service -Name "MongoDB" -ErrorAction Stop
    Write-Host "✓ MongoDB service found" -ForegroundColor Green
    
    # Check service status
    if ($service.Status -eq "Running") {
        Write-Host "✓ MongoDB is RUNNING" -ForegroundColor Green
    } else {
        Write-Host "✗ MongoDB is NOT running (Status: $($service.Status))" -ForegroundColor Red
        
        if ($isAdmin) {
            Write-Host ""
            $start = Read-Host "Would you like to start MongoDB now? (Y/N)"
            if ($start -eq "Y" -or $start -eq "y") {
                Write-Host "Starting MongoDB..." -ForegroundColor Yellow
                Start-Service -Name "MongoDB"
                Start-Sleep -Seconds 2
                $service = Get-Service -Name "MongoDB"
                if ($service.Status -eq "Running") {
                    Write-Host "✓ MongoDB started successfully!" -ForegroundColor Green
                } else {
                    Write-Host "✗ Failed to start MongoDB" -ForegroundColor Red
                }
            }
        } else {
            Write-Host ""
            Write-Host "To start MongoDB, run as Administrator:" -ForegroundColor Yellow
            Write-Host "  net start MongoDB" -ForegroundColor White
        }
    }
} catch {
    Write-Host "✗ MongoDB service not found" -ForegroundColor Red
    Write-Host "MongoDB may not be installed as a service." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "You can:" -ForegroundColor Yellow
    Write-Host "1. Reinstall MongoDB and check 'Install as Service'" -ForegroundColor White
    Write-Host "2. Start MongoDB manually (see MONGODB_WINDOWS_SETUP.md)" -ForegroundColor White
}

Write-Host ""

# Test MongoDB connection
Write-Host "Testing MongoDB connection..." -ForegroundColor Yellow

if (Test-Path "$mongoBinPath\mongosh.exe") {
    $testResult = & "$mongoBinPath\mongosh.exe" --eval "db.version()" --quiet 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Successfully connected to MongoDB" -ForegroundColor Green
        Write-Host "  MongoDB Version: $testResult" -ForegroundColor Gray
    } else {
        Write-Host "✗ Could not connect to MongoDB" -ForegroundColor Red
        Write-Host "  Make sure MongoDB is running" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️  mongosh.exe not found, skipping connection test" -ForegroundColor Yellow
}

Write-Host ""

# Check if port 27017 is listening
Write-Host "Checking MongoDB port (27017)..." -ForegroundColor Yellow

$portCheck = netstat -an | Select-String "27017" | Select-String "LISTENING"
if ($portCheck) {
    Write-Host "✓ MongoDB is listening on port 27017" -ForegroundColor Green
} else {
    Write-Host "✗ Port 27017 is not listening" -ForegroundColor Red
    Write-Host "  MongoDB may not be running" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

$service = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue

if ($service -and $service.Status -eq "Running") {
    Write-Host "✓ MongoDB is ready to use!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Start the backend:" -ForegroundColor White
    Write-Host "   cd D:\skillsync\backend" -ForegroundColor Gray
    Write-Host "   uvicorn app.main:app --reload --port 5000" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Test the API:" -ForegroundColor White
    Write-Host "   http://localhost:5000/docs" -ForegroundColor Gray
} else {
    Write-Host "✗ MongoDB is not ready" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "1. Install MongoDB (see MONGODB_WINDOWS_SETUP.md)" -ForegroundColor White
    Write-Host "2. Start MongoDB as Administrator:" -ForegroundColor White
    Write-Host "   net start MongoDB" -ForegroundColor Gray
    Write-Host "3. Run this script again to verify" -ForegroundColor White
}

Write-Host ""
