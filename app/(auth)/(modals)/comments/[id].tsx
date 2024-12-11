import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useCommentList } from '@/hooks/api/comment.hook';
import { CommentDto } from '@/types/comment';

const PostComment = () => {

    const { id } = useLocalSearchParams<{ id: string }>()

    const { data, isLoading, error } = useCommentList(id)

    const renderComment = ({ item }: { item: CommentDto }) => {
        return (
            <View key={item.id} style={styles.comment}>
                <Text style={styles.commentAuthor}>{item.user.username}</Text>
                <Text style={styles.commentDate}>{item.created.toString() ?? ""}</Text>
                <Text style={styles.commentText}>{item.content}</Text>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={80}
        >
            {data && (
                <FlatList
                    data={data.data}
                    renderItem={({ item }: { item: CommentDto }) => renderComment({ item })}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.commentsList}
                />
            )}

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    commentsList: {
        padding: 15,
    },
    commentContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    commentContent: {
        flex: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        fontWeight: 'bold',
        marginBottom: 2,
    },
    comment: {
        marginBottom: 16,
    },
    commentText: {
        fontSize: 14,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        padding: 10,
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