(function (types) {
    types.document_type = {
        Policy: 1,
        WelcomeLetterAndDocuments: 2,
        PremiumChangeRoster: 3,
        AmendmentChanges: 4,
        Certificate: 5,
        properties: {
            1: { name: "Policy", value: 1 },
            2: { name: "Welcome Letters And Documents", value: 2 },
            3: { name: "Premium Change Roster", value: 3 },
            4: { name: "Amendment Changes", value: 4 },
            5: { name: "Certificate", value: 5 }
        }
    };

    types.tag_type = {
        Group: 1,
        State: 2,
        properties: {
            1: { name: "Group", value: 1 },
            2: { name: "State", value: 2 }
        }
    };

    types.user_role = {
        Admin: 1,
        User: 2,
        properties: {
            1: { name: "Administrator", value: 1 },
            2: { name: "User", value: 2 }
        }
    };

    types.get_name = function (type, type_id) {
        var properties = type.properties[type_id];
        if (typeof properties == 'undefined') return 'N/A';
        else if (typeof properties.name == 'undefined') return 'N/A';
        else return properties.name;
    }
})(app.types);