@ECHO OFF

ECHO ----------------
ECHO 1 - [ production - npm run build ]
ECHO 2 - [ production - npm run serve ]
ECHO ----------------

SET /P input="ENTER: "

IF %input% == 1 (
    CALL npm run build
)

IF %input% == 2 (
    CALL npm run serve
)

ECHO ----------------

ECHO FINISHED

PAUSE
