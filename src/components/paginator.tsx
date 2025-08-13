import { Text, View, StyleSheet } from 'react-native';
import { textStyles } from '../styles/textStyles';
import { containerStyles } from '../styles/containerStyles';
import IconActionButton from './buttons/icon-action-button';
import ActionButton from './buttons/action-button';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { formStyles } from '../styles/formStyles';

interface PaginatorProps {
    currentPage: number;
    totalPages: number
    onPageChange: (pageIndex: number) => void;
}

export default function Paginator({ currentPage, totalPages, onPageChange }: PaginatorProps) {
    // intern display of page in the paginator text input
    const [selectedPage, setSelectedPage] = useState(currentPage + 1)

    // parsing of text input into a number no validation at this stage but disabling of
    // the button may be added there
    const updateSelectedPageInput = (text: string) => {
        const num = parseInt(text, 10);
        if (!isNaN(num)) {
            setSelectedPage(num);
        }
    };

    // wrapper function to handle the change of page taking into account that pages are indexed at 1 on
    // the display but all the logic is indexed at 0 based on array conventions
    const handlePageChangeRequest = (requestedPage: number) => {
        console.log("pressed button with requested page: " + requestedPage)
        if (requestedPage < 1 || requestedPage > totalPages) {
            setSelectedPage(currentPage + 1);
            return;
        }
        const pageToFetch = requestedPage - 1
        onPageChange(pageToFetch);
    }

    const PageInputer = () => {
        return (
            <View style={localStyle.paginatorInputWrapperStyle}>
                <View style={localStyle.paginatorInputTextStyle}>
                    <TextInput
                        style={formStyles.input}
                        value={String(selectedPage)}
                        onChangeText={updateSelectedPageInput}
                        keyboardType="numeric"
                    />
                    <Text style={textStyles.default}>/{totalPages}</Text>
                </View>
                <ActionButton title='Go' callback={() => handlePageChangeRequest(selectedPage)} />
            </View>
        )
    }

    return (
        <View style={containerStyles.inlineContainer}>
            <IconActionButton
                iconName='play-skip-back-circle-outline'
                callback={() => handlePageChangeRequest(1)} />
            <IconActionButton
                iconName='caret-back-circle-outline'
                callback={() => handlePageChangeRequest(selectedPage - 1)} />
            <PageInputer />
            <IconActionButton
                iconName='caret-forward-circle-outline'
                callback={() => handlePageChangeRequest(selectedPage + 1)} />
            <IconActionButton
                iconName='play-skip-forward-circle-outline'
                callback={() => handlePageChangeRequest(totalPages)} />
        </View>
    );
}

const localStyle = StyleSheet.create({
    paginatorInputWrapperStyle: {
        width: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 6,
    },
    paginatorInputTextStyle: {
        width: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    }
})