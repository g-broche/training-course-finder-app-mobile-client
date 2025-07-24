import { Pressable, View, Text } from "react-native"
import { router } from "expo-router"
import SignInForm from "../../../src/components/forms/sign-in-form"
import { COLOR_STYLES } from "../../../src/styles/constants/colors"
import { containerStyles } from "../../../src/styles/containerStyles"

export default function SignIn() {
    return (
        <View style={containerStyles.main}>
            {/* <ViewTitle title="Home" /> */}
            <SignInForm></SignInForm>
            <Pressable onPress={() => router.push("/sign-up")} style={{ marginTop: 10 }}>
                <Text style={{ color: COLOR_STYLES.defaultTheme.colorInteractiveActive, textAlign: 'center' }}>
                    No account? Sign up
                </Text>
            </Pressable>
        </View>
    )
}