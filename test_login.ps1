$body = @{
    email = "testuser@example.com"
    password = "password123"
} | ConvertTo-Json

Write-Host "Testing login endpoint..."
Write-Host "Request body: $body"

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
    Write-Host "Success! Login successful!"
    Write-Host "Response:" 
    $response | ConvertTo-Json
} catch {
    Write-Host "Failed! Login failed!"
    Write-Host "Error:" $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body:" $responseBody
    }
}
