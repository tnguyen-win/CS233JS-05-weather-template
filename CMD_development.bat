@ECHO OFF

ECHO ----------------
ECHO 1 - [ development - npm run watch:webpack ]
ECHO 2 - [ development - npm run lint ]
ECHO 3 - [ development - npm run lint-fix ]
ECHO 7 - [ development - publish to NPMJS - lib-component ]
ECHO 8 - [ development - publish to NPMJS - lib-date2  ]
ECHO 10 - [ development - npm run git-reset ]
ECHO 11 - [ development - npm run git-force ]
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

IF %input% == 8 (
    CALL CD "%CD%\dev_modules\@ocdla\component"
    CALL npm publish --access=public
)

IF %input% == 9 (
    CALL CD "%CD%\dev_modules\@ocdla\date2"
    CALL npm publish --access=public
)

IF %input% == 10 (
    CALL npm run git-reset
)

IF %input% == 11 (
    CALL npm run git-force
)

ECHO ----------------

ECHO FINISHED

PAUSE
