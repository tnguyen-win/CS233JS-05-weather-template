@ECHO OFF

ECHO ----------------
ECHO 1 - [ development - npm run watch:webpack ]
ECHO 2 - [ development - npm run lint ]
ECHO 3 - [ development - npm run lint-fix ]
ECHO 4 - [ development - npm run watch:tailwindcss ]
ECHO 10 - [ development - npm run git-reset ]
ECHO ----------------

SET /P input="ENTER: "

IF %input% == 1 (
	CALL npm run watch:webpack
)

IF %input% == 2 (
	CALL npm run lint
)

IF %input% == 3 (
	CALL npm run lint-fix
)

IF %input% == 4 (
	CALL npm run watch:tailwindcss
)

IF %input% == 10 (
	CALL npm run git-reset
)

ECHO ----------------

ECHO FINISHED

PAUSE
