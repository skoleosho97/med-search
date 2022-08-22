import * as React from 'react';
import * as Realm from 'realm';
import App from '../Realm';

let AuthContext = React.createContext(null);

let AuthProvider = ({ children }) => {
    let [user, setUser] = React.useState(App.currentUser);
    let ref = React.useRef(null);

    React.useEffect(() => {
        if (!user) { return; }

        let config = {
            sync: {
                user,
                partitionValue: `user=${user.id}`,
            }
        };

        Realm.open(config).then((userRealm) => {
            ref.current = userRealm;
        });

        return () => {
            let userRealm = ref.current;

            if (userRealm) {
                userRealm.close();
                ref.current = null;
            }
        };
    }, [user]);

    return (
        <AuthContext.Provider value={{ user }}>
            { children }
        </AuthContext.Provider>
    );
};

let useAuth = () => {
    let auth = React.useContext(AuthContext);

    if (auth == null) {
        throw new Error('Error');
    }

    return auth;
};

export { AuthProvider, useAuth };