import {
    View,
    Text,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCommentList, usePostComment } from '@/hooks/api/comment.hook';
import { CommentDto } from '@/types/comment';
import { timeSince } from '../../../../utils/ago.utility';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const PostComment = () => {
    const { t } = useTranslation()
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [comment, setComment] = useState<string>("");
    const { data, isLoading, error } = useCommentList(id);
    const { handleSubmit, isSuccess, error: postError } = usePostComment();

    useEffect(() => {
        if (isSuccess) {
            router.back();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (postError) {
            Alert.alert("Algo salio mal");
        }
    }, [postError]);

    const renderComment = ({ item }: { item: CommentDto }) => {
        return (
            <View style={styles.commentContainer}>
                <Image
                    source={{ uri: item.user.profile ?? "" }}
                    style={styles.avatar}
                />
                <View style={styles.commentContent}>
                    <View style={styles.commentHeader}>
                        <Text style={styles.commentAuthor}>{item.user.username}</Text>
                        <Text style={styles.commentDate}>{timeSince(new Date(item.created))}</Text>
                    </View>
                    <Text style={styles.commentText}>{item.content}</Text>
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={100}
        >
            {data && (
                <FlatList
                    data={data.data}
                    renderItem={renderComment}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.commentsList}
                />
            )}

            <SafeAreaView style={styles.inputWrapper}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputField}
                        value={comment}
                        onChangeText={setComment}
                        placeholder={t('comments.write')}
                        placeholderTextColor="#666"
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={() => handleSubmit({ placeId: id, content: comment })}
                    >
                        <Ionicons name="arrow-up" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    commentsList: {
        padding: 16,
    },
    commentContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    commentContent: {
        flex: 1,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    commentAuthor: {
        fontSize: 14,
        fontWeight: '600',
        marginRight: 8,
    },
    commentDate: {
        fontSize: 12,
        color: '#666',
    },
    commentText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#333',
        marginBottom: 8,
    },
    interactionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    interactionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    interactionCount: {
        fontSize: 12,
        color: '#666',
    },
    inputWrapper: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        padding: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    inputField: {
        flex: 1,
        height: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 16,
        fontSize: 14,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#0066FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PostComment;
