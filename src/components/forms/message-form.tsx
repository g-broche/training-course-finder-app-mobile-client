import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, ScrollView, StyleSheet, View } from "react-native";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { useContinueDiscussion } from "../../hooks/discussion/useContinueDiscussions";
import { useStartDiscussion } from "../../hooks/discussion/useStartDiscussions";
import { DIMENSIONS } from "../../styles/constants/dimensions";
import { NewMessageRequest } from "../../types/request";
import ActionButton from "../buttons/action-button";
import { FormGroupArea } from "./form-group-area";

interface MessageFormProps {
  announceId: string;
  discussionId?: string;
  isDiscussionStarter: boolean;
  onSuccess?: () => void;
}

const messageSchema = yup.object().shape({
  message: yup
    .string()
    .required("Message is required")
    .min(1, "Message cannot be empty"),
});

export default function MessageForm({
  announceId,
  discussionId,
  isDiscussionStarter = false,
  onSuccess,
}: MessageFormProps) {
  const { authState } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const { mutate: startDiscussion, isPending: isPendingStartDiscussion } =
    useStartDiscussion({ announceId });
  const { mutate: continueDiscussion, isPending: isPendingContinueDiscussion } =
    useContinueDiscussion({ discussionId });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewMessageRequest>({
    resolver: yupResolver(messageSchema) as any,
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: false });
        }, 100);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onSubmit = async (data: NewMessageRequest) => {
    if (!authState?.accessToken) {
      Alert.alert("Unauthorized", "You must be logged in to send a message.");
      return;
    }

    try {
      if (isDiscussionStarter) {
        startDiscussion(data, {
          onSuccess: () => {
            reset();
            onSuccess?.();
          },
          onError: (error) => {
            console.error("Message submission error:", error);
            Alert.alert("Error", "Failed to send message.");
          },
        });
      } else {
        continueDiscussion(data, {
          onSuccess: () => {
            reset();
            onSuccess?.();
          },
          onError: (error) => {
            console.error("Message submission error:", error);
            Alert.alert("Error", "Failed to send message.");
          },
        });
      }
    } catch (err) {
      console.error("Message submission error:", err);
      Alert.alert("Error", "Failed to send message.");
    }
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          paddingBottom: keyboardVisible ? contentHeight : 0,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={styles.innerWrapper}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setContentHeight(height - 20);
          }}
        >
          <FormGroupArea
            name="message"
            label="Reply"
            placeholder="Enter your message..."
            control={control}
            errors={errors}
          />

          <ActionButton
            title={isDiscussionStarter ? "Start Discussion" : "Send Message"}
            callback={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  innerWrapper: {
    gap: DIMENSIONS.spacings.gaps.l,
  },
});
