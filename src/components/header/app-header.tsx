import { View, Text } from 'react-native';
import { headerStyles } from '../../styles/headerStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { containerStyles } from '../../styles/containerStyles';
import HeaderUserAuth from './header-user-auth';
import Burger from './burger';

type AppHeaderProps = {
    onSignInPress: () => void;
};



export default function AppHeader({ onSignInPress }: AppHeaderProps) {
    return (
        <SafeAreaView style={containerStyles.viewContainer}>
            <View style={headerStyles.container}>
                {/* Your Burger menu */}
                <Burger />

                <Text style={headerStyles.title}>Retriever</Text>

                <View style={headerStyles.actions}>
                    {/* Pass the handler to HeaderUserAuth */}
                    <HeaderUserAuth onSignInPress={onSignInPress} />
                </View>
            </View>
        </SafeAreaView>
    );
}