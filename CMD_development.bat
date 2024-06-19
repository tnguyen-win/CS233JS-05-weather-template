@ECHO OFF

ECHO ----------------
ECHO 1 - [ development - npm run watch ]
ECHO 10 - [ development - npm run git-reset ]
ECHO ----------------

SET /P input="ENTER: "

IF %input% == 1 (
	CALL npm run watch
)

IF %input% == 10 (
	CALL npm run git-reset
)

ECHO ----------------

ECHO FINISHED

PAUSE
