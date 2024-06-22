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
};

export type LangType = 'fr' | 'en';
