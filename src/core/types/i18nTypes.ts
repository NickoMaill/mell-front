export type TranslationResourcesType = {
    common: {
        title;
        yes;
        no;
        send;
        noResultDb;
        changeLang;
        sendMessage;
        openMenu;
        search;
        emailAddress;
        password;
        welcome;
        resend;
        add;
        update;
        dismiss;
        delete;
        youAdd;
        youUpdate;
        youDismiss;
        youDelete;
        adding;
        updating;
        deleting;
        back;
        filter;
        filters;
        details;
        table: {
            columns: {
                showAll;
                hideAll;
                placeholder;
                search;
                singular;
                plural;
                density;
                comfortable;
                skinny;
                regular;
                selectedLines;
            };
            nav: {
                resultPerPage;
            };
            filter: {
                sortAsc;
                sortDesc;
                hideColumns;
                manageColumns;
                label;
            };
        };
    };
    login: {
        rememberMe;
        forgotPassword;
        pleaseConnect;
        connect;
        wrongCredentials;
        expiredSession;
        expiredMfa;
        requiredEmail;
        requiredPassword;
        resetTitle;
        resetMessage;
        resetDetails;
        resetLabel;
        MfaTitle;
        MfaSubtitle;
        MfaDetails;
        resendMfa;
    };
    noAccess: {
        intro;
        please;
        expired;
        login;
    };
    center: {
        search: {
            newSearch;
            updateSearch;
            filters;
            nothing;
            orderBy;
        };
        bulk: {
            bulkUpdate;
            bulkAdd;
            downloadTemplate;
            importXlsx;
            bulkAddMessage;
            bulkTitle;
        };
        update: {
            success;
        };
        create: {
            success;
        };
    };
    error: {
        common: {
            error;
        };
        errorMessage;
        errorBoundary: {
            sorry;
            firstErrorMessage;
            supportEmail;
            technicalStaff;
            thanks;
            toSendMessage;
            pleaseSend;
            thenClick;
            errorReport;
            diag;
            source;
            at;
            trace;
            page;
            clockDate;
            browser;
            address;
            linkForward;
        };
        noAccess: {
            intro;
            please;
            expired;
            login;
        };
    };
};

export type LangType = 'fr' | 'en';
