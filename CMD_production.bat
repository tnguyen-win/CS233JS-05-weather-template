@ECHO OFF

ECHO ----------------
ECHO 1 - [ production - npm run webpack ]
ECHO 2 - [ production - npm run build ]
ECHO ----------------

SET /P input="ENTER: "

IF %input% == 1 (
    CALL npm run webpack
)

IF %input% == 2 (
    CALL npm run build
)

ECHO ----------------

ECHO FINISHED

PAUSE
