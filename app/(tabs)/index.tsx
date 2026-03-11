import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnnounceGrid from "../../src/components/announces/announce-grid";
import { EmptyState } from "../../src/components/shared/empty-state copy";
import { ErrorState } from "../../src/components/shared/error-state";
import { LoaderState } from "../../src/components/shared/loader-state";
import Paginator from "../../src/components/shared/paginator";
import ViewTitle from "../../src/components/shared/view-title";
import { useAuth } from "../../src/context/AuthContext";
import { usePaginatedFoundLatest } from "../../src/hooks/announce/usePaginatedFoundLatest";
import { usePaginatedLostLatest } from "../../src/hooks/announce/usePaginatedLostLatest";
import { usePaginatedUserAnnounces } from "../../src/hooks/announce/usePaginatedUserAnnounces";
import { containerStyles } from "../../src/styles/containerStyles";
import { textStyles } from "../../src/styles/textStyles";

const PaginationSizeForAnnounces = 4;

export default function Home() {
  const { authState } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [foundPage, setFoundPage] = useState(0);
  const [lostPage, setLostPage] = useState(0);

  const {
    data: userAnnounces,
    isLoading,
    isError,
    error,
  } = usePaginatedUserAnnounces({
    currentPage,
    size: PaginationSizeForAnnounces,
  });

  const {
    data: latestFound,
    isLoading: isLoadingFound,
    isError: isErrorFound,
    error: errorFound,
  } = usePaginatedFoundLatest({
    currentPage: foundPage,
    size: PaginationSizeForAnnounces,
  });

  const {
    data: latestLost,
    isLoading: isLoadingLost,
    isError: isErrorLost,
    error: errorLost,
  } = usePaginatedLostLatest({
    currentPage: lostPage,
    size: PaginationSizeForAnnounces,
  });

  const hasLoadedSuccessfully =
    !isLoading && !isError && userAnnounces?.content;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={containerStyles.main}>
          <ViewTitle title="Home page" />
          {authState?.authenticated && (
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
          )}

          {/* Latest Found Items */}
          <Text style={textStyles.heading3}>Latest found items</Text>
          {isLoadingFound && <LoaderState />}
          {isErrorFound && <ErrorState message={String(errorFound)} />}
          {!isLoadingFound && !isErrorFound && latestFound?.content && (
            <>
              {latestFound.content.length > 0 ? (
                <>
                  <AnnounceGrid announces={latestFound.content} />
                  {latestFound.totalPages && latestFound.totalPages > 1 && (
                    <Paginator
                      currentPage={foundPage}
                      totalPages={latestFound.totalPages}
                      onPageChange={(pageIndex) => setFoundPage(pageIndex)}
                    />
                  )}
                </>
              ) : (
                <EmptyState message="No found item announces available." />
              )}
            </>
          )}

          {/* Latest Lost Items */}
          <Text style={textStyles.heading3}>Latest lost items</Text>
          {isLoadingLost && <LoaderState />}
          {isErrorLost && <ErrorState message={String(errorLost)} />}
          {!isLoadingLost && !isErrorLost && latestLost?.content && (
            <>
              {latestLost.content.length > 0 ? (
                <>
                  <AnnounceGrid announces={latestLost.content} />
                  {latestLost.totalPages && latestLost.totalPages > 1 && (
                    <Paginator
                      currentPage={lostPage}
                      totalPages={latestLost.totalPages}
                      onPageChange={(pageIndex) => setLostPage(pageIndex)}
                    />
                  )}
                </>
              ) : (
                <EmptyState message="No lost item announces available." />
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
