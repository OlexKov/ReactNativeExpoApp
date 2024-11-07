import { Stack } from "expo-router";
import React from "react";
import { CustomHeader } from "@/components/header";


export default function RootLayout() {

    return (
        <Stack>
            <Stack.Screen name="index" options={{ header: () => <CustomHeader title="Продукти" /> }} />
        </Stack>

    );
}