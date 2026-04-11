@echo off
echo Executando VerDenovo Backend...
echo.

java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Java nao encontrado!
    echo Instale Java 17 ou superior: https://adoptium.net/
    pause
    exit /b 1
)

if exist mvnw.cmd (
    echo Usando Maven Wrapper...
    mvnw.cmd spring-boot:run
) else (
    mvn spring-boot:run
)

pause
