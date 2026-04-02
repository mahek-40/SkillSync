$body = @{
    name = "Test User"
    email = "testuser@example.com"
    password = "password123"
    location = "Test City"
    bio = "Test bio"
    availability = @("Weekdays")
    skillsOffered = @("Python", "JavaScript")
    skillsWanted = @("React", "Node.js")
} | ConvertTo-Json

Write-Host "Testing signup endpoint..."
Write-Host "Request body: $body"

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/signup" -Method Post -Body $body -ContentType "application/json"
    Write-Host "Success! Signup successful!"
    Write-Host "Response:" 
    $response | ConvertTo-Json
} catch {
    Write-Host "Failed! Signup failed!"
    Write-Host "Error:" $_.Exception.Message
}
