import { useAuth } from "@/provider/AuthProvider"
import React, { useState } from "react"
import { StyleSheet, View, Image, Text, TouchableOpacity, SafeAreaView } from "react-native"
import * as WebBrowser from "expo-web-browser"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useTranslation } from "react-i18next"
import { Input } from "@/components/input/Input"
import { PrimaryButton } from "@/components/button/PrimaryButton"
import { Ionicons } from "@expo/vector-icons"

WebBrowser.maybeCompleteAuthSession()

GoogleSignin.configure({
    webClientId: "1011914220034-g1i51hc2l26qjjltppqopb2cu63ti10p.apps.googleusercontent.com",
    scopes: ['profile', 'email'],
    offlineAccess: true,
    forceCodeForRefreshToken: false,
    iosClientId: "1011914220034-g6hp7vcv2e3vjoa4bcqpfueqa2fh687j.apps.googleusercontent.com"
})

const Page = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false)

    const { login, signInWithGoogle } = useAuth()

    const { t } = useTranslation()

    const googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const user = await GoogleSignin.signIn()
            if (user.data?.idToken) {
                signInWithGoogle(user.data.idToken)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = () => {
        login(email, password)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SafeAreaView />
                <Text style={styles.title}>Sign in to your{'\n'}Account</Text>
                <Text style={styles.subtitle}>{t('auth.login.title')}</Text>
            </View>

            <View style={styles.form}>
                <Input
                    placeholder={t('auth.login.email')}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <Input
                    placeholder={t('auth.login.password')}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    rightIcon={showPassword ? 'eye-off' : 'eye'}
                    onRightIconPress={() => setShowPassword(!showPassword)}
                />

                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.forgotPassword}
                >
                    <Text style={styles.forgotPasswordText}>{t('auth.login.forgotPassword')}</Text>
                </TouchableOpacity>

                <PrimaryButton title={t('auth.login.signin')} onPress={handleSubmit} />

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>{t('auth.login.orSignIn')}</Text>
                    <View style={styles.dividerLine} />
                </View>

                <View style={styles.socialButtons}>
                    <TouchableOpacity
                        style={styles.socialButton}
                        onPress={googleSignIn}
                    >
                        <Image
                            source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                            style={styles.socialIcon}
                        />
                        <Text style={styles.socialButtonText}>{t('auth.login.google')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>{t('auth.login.dontHaveAccount')} </Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={styles.footerLink}>{t('auth.login.signup')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        backgroundColor: '#111',
        padding: 24,
        paddingTop: 48,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#999',
    },
    form: {
        flex: 1,
        padding: 24,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 16,
    },
    forgotPasswordText: {
        color: '#FF4500',
        fontSize: 14,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E5E5',
    },
    dividerText: {
        color: '#999',
        paddingHorizontal: 16,
        fontSize: 14,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        gap: 8,
    },
    socialIcon: {
        width: 24,
        height: 24,
    },
    socialButtonText: {
        fontSize: 14,
        color: '#333',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
    footerText: {
        color: '#666',
        fontSize: 14,
    },
    footerLink: {
        color: '#FF4500',
        fontSize: 14,
        fontWeight: '600',
    },
})