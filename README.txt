This document consists of an overview of the project's architecture.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

routers
    usersRouter
        post('/signup')
        post('/login')

    credentialsRouter
        post('/new-credential')
        get('/credential')
        delete('/credential/:id')
        delete('/credential/:id')

    safeNotesRouter
        post('/new-note')
        get('/notes')
        get('/note/:id')
        delete('/note/:id')

    cardsRouter
        post('/new-card')
        get('/cards')
        get('/card/:id')
        delete('/card/:id')

    wifiRouter
        post('/new-wifi')
        get('/wifies')
        get('/wifi/:id')
        delete('/wifi/:id')

    routers
        usersRouter
        credentialsRouter
        safeNotesRouter
        cardsRouter
        wifiRouter

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

middlewares

    validatorMiddleware
        dataValidator(schema)

    errorMiddleware
        errorHandler(error, req, res, next)
            if(error.type === 'invalid_email')
            if(error.type === 'invalid_password')
            if(error.type === 'invalid_title')
            if(error.type === 'invalid_urlUser')
            if(error.type === 'invalid_credential_id')
            if(error.type === 'invalid_safeNote_id')
            if(error.type === 'invalid_card_id')
            if(error.type === 'invalid_wifi_id')

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

schemas
    userSchema
    credentialSchema
    safeNoteSchema
    cardSchema
    wifiSchema

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
controllers
    usersController
        signup(req, res)
        login(req, res)

    credentialController
        postCredential(req, res)
        getCredentials(req, res)
        getCredentialById(req, res)
        deleteCredentialById(req, res)

    safeNotesController
        postSafeNote(req, res)
        getSafeNotes(req, res)
        getSafeNoteById(req, res)
        deleteSafeNoteById(req, res)

    cardsController
        postCard(req, res)
        getCards(req, res)
        getCardById(req, res)
        deleteCardById(req, res)

    wifiController
        postWifi(req, res)
        getWifi(req, res)
        getWifiById(req, res)
        deleteWifiById(req, res)

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

services
    userServices
        checkEmailAtSignUp(),
        checkEmailAtLogin(),
        checkPasswordAtLogin(),
        createUser()
            
    credentialServices
        hideCredentialPassword()
        showCredentialPassword()
        checkTitleAtDataBase()
        checkUrlUserAtDataBase()
        createCredential()
        findAllCredentials()
        findOneCredential()
        removeCredential()
    
    safeNoteServices
        checkTitleAtDataBase()
        createSafeNote()
        findAllSafeNotes()
        findOneSafeNote()
        removeSafeNote()

    cardServices
            hideCardPassword()
            hideCardCvc()
            showCardPassword()
            showCardCvc()
            checkTitleAtDataBase()
            createCard()
            findAllCards()
            findOneCard()
            removeCard()

    wifiServices
        hideWifiPassword()
        showWifiPassword()
        checkTitleAtDataBase()
        createWifi()
        findAllWifies()
        findOneWifi()
        removeWifi()

    tokenServices
        createToken()
        decodeToken()
        findUserId()

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

repositories
    usersRepository
        getUserByEmail()
        postUser()

    credentialsRepository
        getTitleByUserId()
        getUrlUserByUserIdAndUrl()
        postCredential()
        getAllCredentialsByUserId()
        getCredentialById()
        deleteCredentialById()

    safeNotesRepository
        getTitleByUserId()
        postSafeNote()
        getAllSafeNotesByUserId()
        getSafeNoteById()
        deleteSafeNoteById()

    cardsRepository
        getTitleByUserId()
        postCard()
        getAllCardsByUserId()
        getCardById()
        deleteCardById()

    wifiRepository
        getTitleByUserId()
        postWifi()
        getAllWifiesByUserId()
        getWifiById()
        deleteWifiById()

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

databases
    postgres 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

types
    userTypes
        IUserData
    credentialTypes
        ICredentialData
        INewCredentialData
    safeNotesTypes
        ISafeNoteData
        INewNoteData
    cardTypes
        ICardData
        INewCardData
    wifiTypes
        IWifiData
        INewWifiData

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

utils
    passwordEncrypter()
    passwordDecrypter()