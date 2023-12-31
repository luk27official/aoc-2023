param (
    [string]$folderName
)

# Check if folder name is provided
if (-not $folderName) {
    Write-Host "Please provide a folder name as the first argument."
    exit 1
}

# Create the folder
New-Item -ItemType Directory -Path $folderName -ErrorAction SilentlyContinue | Out-Null

# Check if the folder was created successfully
if (-not (Test-Path $folderName)) {
    Write-Host "Failed to create folder '$folderName'."
    exit 1
}

# Create empty files within the folder
$files = @("$folderName\$folderName-input.txt", "$folderName\$folderName-input-real.txt", "$folderName\$folderName-1.ts", "$folderName\$folderName-2.ts")

foreach ($file in $files) {
    New-Item -ItemType File -Path $file -ErrorAction SilentlyContinue | Out-Null
    if (-not (Test-Path $file)) {
        Write-Host "Failed to create file '$file'."
    } else {
        Write-Host "Created file: $file"
    }
}

# Copy contents from template file to $folderName-1.ts
$templateFile = "template/template.ts"
$destinationFile = "$folderName\$folderName-1.ts"

if (Test-Path $templateFile) {
    try {
        Copy-Item -Path $templateFile -Destination $destinationFile -ErrorAction Stop
        Write-Host "Copied contents from '$templateFile' to '$destinationFile'."
    } catch {
        Write-Host "Failed to copy contents from '$templateFile' to '$destinationFile'."
    }
} else {
    Write-Host "Template file '$templateFile' not found."
}
