import { Pressable, View, Text } from "react-native"
import { router } from "expo-router"
import { containerStyles } from "../../../src/styles/containerStyles"
import SignUpForm from "../../../src/components/forms/sign-up-form"
import { COLOR_STYLES } from "../../../src/styles/constants/colors"

export default function SignIn() {
    return (
        <View style={containerStyles.main}>
            {/* <ViewTitle title="Home" /> */}
            <SignUpForm></SignUpForm>
            <Pressable onPress={() => router.push("/sign-in")} style={{ marginTop: 10 }}>
                <Text style={{ color: COLOR_STYLES.defaultTheme.colorInteractiveActive, textAlign: 'center' }}>
                    Already have an account? Sign in
                </Text>
            </Pressable>
        </View>
    )
}