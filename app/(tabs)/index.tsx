import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnnounceGrid from "../../src/components/announces/announce-grid";
import Paginator from "../../src/components/paginator";
import { EmptyState } from "../../src/components/shared/empty-state copy";
import { ErrorState } from "../../src/components/shared/error-state";
import { LoaderState } from "../../src/components/shared/loader-state";
import ViewTitle from "../../src/components/view-title";
import { useAuth } from "../../src/context/AuthContext";
import { usePaginatedUserAnnounces } from "../../src/hooks/announce/usePaginatedUserAnnounces";
import { containerStyles } from "../../src/styles/containerStyles";
import { textStyles } from "../../src/styles/textStyles";

export default function Home() {
  const { authState } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: userAnnounces,
    isLoading,
    isError,
    error,
  } = usePaginatedUserAnnounces(currentPage);

  const hasLoadedSuccessfully =
    !isLoading && !isError && userAnnounces?.content;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={containerStyles.main}>
          <ViewTitle title="Home page" />
          {authState?.authenticated ? (
            <>
              <Text style={textStyles.heading3}>My Announces</Text>
              {isLoading && <LoaderState />}
              {isError && <ErrorState message={String(error)} />}
              {hasLoadedSuccessfully && (
                <>
                  {userAnnounces.content.length > 0 ? (
                    <>
                      <AnnounceGrid announces={userAnnounces.content} />
                      {userAnnounces.totalPages &&
                        userAnnounces.totalPages > 1 && (
                          <Paginator
                            currentPage={currentPage}
                            totalPages={userAnnounces.totalPages}
                            onPageChange={(pageIndex) =>
                              setCurrentPage(pageIndex)
                            }
                          />
                        )}
                    </>
                  ) : (
                    <EmptyState message="You haven't posted any announces yet." />
                  )}
                </>
              )}
            </>
          ) : (
            <Text style={textStyles.default}>
              Please log in to view your announces.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
