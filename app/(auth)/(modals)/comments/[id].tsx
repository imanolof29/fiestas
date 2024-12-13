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
    Image
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCommentList, usePostComment } from '@/hooks/api/comment.hook';
import { CommentDto } from '@/types/comment';
import { timeSince } from '../../../../utils/ago.utility';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const PostComment = () => {

    const { id } = useLocalSearchParams<{ id: string }>()

    const router = useRouter()

    const [comment, setComment] = useState<string>("")

    const { data, isLoading, error } = useCommentList(id)

    const { handleSubmit, isSuccess, error: postError } = usePostComment()

    useEffect(() => {
        if (isSuccess) {
            router.back()
        }
    }, [isSuccess])

    useEffect(() => {
        if (postError) {
            Alert.alert("Algo salio mal")
        }
    }, [postError])

    const renderComment = ({ item }: { item: CommentDto }) => {
        return (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Image source={{ uri: item.user.profile ?? "" }} style={{ width: 50, height: 50, borderRadius: 100 }} />
                <View key={item.id} style={styles.comment}>
                    <Text style={styles.commentAuthor}>{item.user.username}</Text>
                    <Text style={styles.commentDate}>{timeSince(new Date(item.created))}</Text>
                    <Text style={styles.commentText}>{item.content}</Text>
                </View>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={20}
        >
            {data && (
                <FlatList
                    data={data.data}
                    renderItem={({ item }: { item: CommentDto }) => renderComment({ item })}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.commentsList}
                />
            )}
            <SafeAreaView>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputField} value={comment} onChangeText={setComment} />
                    <TouchableOpacity onPress={() => handleSubmit({ placeId: id, content: comment })}>
                        <Ionicons name='send' size={24} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: '#fff',
    },
    commentsList: {
        padding: 15,
    },
    comment: {
        marginBottom: 16,
    },
    commentText: {
        fontSize: 14,
    },
    inputContainer: {
        position: "absolute",
        backgroundColor: 'white',
        flexDirection: "row",
        bottom: 100,
        alignItems: "center",
        paddingHorizontal: 10,
        gap: 10
    },
    inputField: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    commentAuthor: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    commentDate: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
});

export default PostComment;

/**
 * <View style={styles.inputContainer}>
                <TextInput
                    value={comment}
                    placeholder="Escribe un comentario..."
                    style={styles.inputField}
                    onChangeText={setComment}
                />
                <TouchableOpacity
                    style={{ padding: 4 }}
                    onPress={() => {
                        if (comment.trim()) {
                            setComments([...comments, {
                                id: (comments.length + 1).toString(),
                                user: 'New User',
                                avatar: 'https://i.pravatar.cc/100?img=3',
                                text: comment.trim()
                            }]);
                            setComment("");
                        }
                    }}
                >
                    <Ionicons name="send-outline" size={24} />
                </TouchableOpacity>
            </View>
 */