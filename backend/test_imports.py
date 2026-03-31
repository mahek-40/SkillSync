#!/usr/bin/env python3
"""
Test script to verify all backend imports work correctly
"""

import sys

def test_import(module_name, description):
    """Test importing a module"""
    try:
        __import__(module_name)
        print(f"✓ {description}")
        return True
    except Exception as e:
        print(f"✗ {description}")
        print(f"  Error: {str(e)}")
        return False

def main():
    print("=" * 50)
    print("Backend Import Test")
    print("=" * 50)
    print()
    
    tests = [
        ("fastapi", "FastAPI framework"),
        ("uvicorn", "Uvicorn server"),
        ("motor", "Motor (MongoDB async driver)"),
        ("pydantic", "Pydantic validation"),
        ("pydantic_settings", "Pydantic settings"),
        ("passlib", "Passlib (password hashing)"),
        ("jose", "Python-JOSE (JWT)"),
        ("dotenv", "Python-dotenv"),
    ]
    
    print("Checking dependencies:")
    print()
    
    all_passed = True
    for module, desc in tests:
        if not test_import(module, desc):
            all_passed = False
    
    print()
    print("Checking backend modules:")
    print()
    
    backend_tests = [
        ("app.core.config", "Configuration"),
        ("app.core.security", "Security utilities"),
        ("app.schemas.user_schema", "User schemas"),
        ("app.schemas.auth_schema", "Auth schemas"),
        ("app.schemas.swap_schema", "Swap schemas"),
        ("app.services.auth_service", "Auth service"),
        ("app.api.deps", "API dependencies"),
        ("app.api.routes.auth_routes", "Auth routes"),
        ("app.api.routes.user_routes", "User routes"),
        ("app.api.routes.swap_routes", "Swap routes"),
        ("app.api.routes.notification_routes", "Notification routes"),
    ]
    
    for module, desc in backend_tests:
        if not test_import(module, desc):
            all_passed = False
    
    print()
    
    # Try to import main app (this will try to connect to MongoDB)
    print("Testing main application:")
    print()
    try:
        from app.main import app
        print("✓ Main application loaded")
        print()
        print("Note: MongoDB connection will be tested when server starts")
    except Exception as e:
        print(f"✗ Main application failed to load")
        print(f"  Error: {str(e)}")
        all_passed = False
    
    print()
    print("=" * 50)
    
    if all_passed:
        print("✓ All tests passed!")
        print()
        print("You can now start the backend:")
        print("  uvicorn app.main:app --reload --port 5000")
        print()
        print("Or use the startup script:")
        print("  .\\start-backend.ps1")
        return 0
    else:
        print("✗ Some tests failed")
        print()
        print("Please install missing dependencies:")
        print("  pip install -r requirements.txt")
        return 1

if __name__ == "__main__":
    sys.exit(main())
