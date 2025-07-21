import { Stack } from 'expo-router';
export default function HomeLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: '#007bff' },
                headerTintColor: '#fff',
            }}
        />
    );
}
