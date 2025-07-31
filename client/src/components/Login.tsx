import { useClickAway } from "@uidotdev/usehooks";
import { FormEvent, MutableRefObject, useEffect, useState } from "react";
import { FormikErrors, useFormik } from 'formik';
import { LoginModel } from "@/models/Login.model";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { forgotPassword, loginCall, registerCall, resetStatus, resetStatusForgotPassword, resetStatusRegister, setShowEmailVerification, setShowUserLogin } from "@/slice/auth/Auth.slice";
import { Checkbox } from "@/components/ui/checkbox"
import { CheckedState } from '@radix-ui/react-checkbox';
import { Label } from "./ui/label";
import { setLogined, setUser } from "@/slice/app/App.slice";
import toast from "react-hot-toast";

const Login = () => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector(state => state.auth);
    const appState = useAppSelector(state => state.app);
    const [emailForgot, setEmailForgot] = useState("");

    const [state, setState] = useState<"login" | "register" | "forgot-password">("login");
    const [rememberChecked, setRememberChecked] = useState<CheckedState>(localStorage.getItem('remember_email') !== null)
    const ref: MutableRefObject<HTMLFormElement> = useClickAway(() => {
        dispatch(setShowUserLogin(false));
    });
    const formikAuth = useFormik<AuthProps>({
        initialValues: {
            email: "",
            password: "",
            name: ""
        },
        validate: (data) => {
            const errors: FormikErrors<AuthProps> = {};
            if (!data.email) {
                errors.email = "Email is required";
            }
            if (!data.password) {
                errors.password = "Password is required";
            }
            if (state === "register" && !data.name) {
                errors.name = "Name is required";
            }
            return errors;
        },
        onSubmit: (data) => {
            switch (state) {
                case "login":
                    dispatch(loginCall(new LoginModel(data.email, data.password, Boolean(rememberChecked))));
                    break;
                case "register":
                    {
                        const payload = {
                            name: data.name,
                            email: data.email,
                            password: data.password
                        };
                        dispatch(registerCall(payload));
                    }
                    break;
            }
        }
    });

    const handleForgotPassword = async (e: FormEvent) => {
        e.preventDefault();
        await dispatch(forgotPassword({ email: emailForgot }));
    }
    useEffect(() => {
        switch (authState.status) {
            case "completed":
                {
                    const localUser = localStorage.getItem('user');
                    const user = JSON.parse(localUser ?? '{}');
                    dispatch(setUser(user));
                    dispatch(setShowUserLogin(false));
                    dispatch(setLogined(true));
                    if (!appState.user?.isVerified) {
                        dispatch(setShowEmailVerification(true));
                    }
                    toast.success(authState.success ?? "Login successful!")
                    dispatch(resetStatus());
                }
                break
            case "failed":
                toast.dismiss();
                toast.error(authState.error ?? "Something went wrong !");
                dispatch(resetStatus());
                break
        }
    }, [appState.user?.isVerified, authState.error, authState.status, authState.success, dispatch]);

    useEffect(() => {
        switch (authState.statusForgotPassword) {
            case "completed":
                toast.success(authState.success ?? "Email sent successfully!");
                dispatch(setShowUserLogin(false));
                dispatch(resetStatusForgotPassword());
                break
            case "failed":
                toast.dismiss();
                toast.error(authState.error ?? "Something went wrong !");
                dispatch(resetStatusForgotPassword());
                break
        }
    }, [authState.error, authState.statusForgotPassword, authState.success, dispatch]);
    useEffect(() => {
        switch (authState.statusRegister) {
            case "completed":
                {
                    const localUser = localStorage.getItem('user');
                    const user = JSON.parse(localUser ?? '{}');
                    dispatch(setUser(user));
                    dispatch(setShowUserLogin(false));
                    dispatch(setLogined(true));
                    if (appState.user?.isVerified) {
                        toast.success(authState.success ?? "Login successful!")
                    } else {
                        dispatch(setShowEmailVerification(true));
                    }
                    dispatch(resetStatusRegister());
                }
                break
            case "failed":
                toast.dismiss();
                toast.error(authState.error ?? "Something went wrong !");
                dispatch(resetStatusRegister());
                break
        }
    }, [appState.user?.isVerified, authState.error, authState.statusRegister, authState.success, dispatch]);

    useEffect(() => {
        if (state === "login") {
            formikAuth.setFieldValue("email", (localStorage.getItem('remember_email') ?? ""))
            formikAuth.setFieldValue("password", (localStorage.getItem('remember_password') ?? ""))
        } else {
            formikAuth.resetForm();
        }
    }, [state])
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-30 flex items-center text-sm text-gray-600 bg-black/50">
            {
                state === "login" || state === "register" ?
                    <form onSubmit={formikAuth.handleSubmit} ref={ref} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
                        <p className="text-2xl font-medium m-auto">
                            <span className="text-primary">{state === "login" ? "Đăng nhập" : "Đăng ký"}</span>
                        </p>
                        {state === "register" && (
                            <div className="w-full">
                                <p>Họ tên</p>
                                <input onChange={(e) => formikAuth.setFieldValue("name", e.target.value)} value={formikAuth.values.name} placeholder="Nhập họ tên" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                            </div>
                        )}
                        <div className="w-full ">
                            <p>Email</p>
                            <input
                                onChange={(e) => formikAuth.setFieldValue("email", e.target.value)}
                                value={formikAuth.values.email}
                                placeholder="Nhập địa chỉ email"
                                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                type="email"
                                required />
                        </div>
                        <div className="w-full ">
                            <p>Mật khẩu</p>
                            <input
                                onChange={(e) => formikAuth.setFieldValue("password", e.target.value)}
                                value={formikAuth.values.password}
                                placeholder="Nhập mật khẩu"
                                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                type="password"
                                required />
                        </div>
                        {state === "login" &&
                            <div className="flex items-center justify-between w-full">
                                <div className='w-fit flex items-center'>
                                    <Checkbox id='remember' checked={rememberChecked} onCheckedChange={(checked) => setRememberChecked(checked ?? false)} className='data-[state=checked]:bg-primary' />
                                    <Label htmlFor='remember' className='cursor-pointer text-text ml-1'>Ghi nhớ</Label>
                                </div>
                                <p onClick={() => setState("forgot-password")} className="hover:underline cursor-pointer">Quên mật khẩu?</p>
                            </div>
                        }

                        {state === "register" ? (
                            <p>
                                Đã có mật khẩu? <span onClick={() => setState("login")} className="text-primary cursor-pointer hover:underline">Ấn vào đây</span>
                            </p>
                        ) : (
                            <p>
                                Tạo tài khoản mới? <span onClick={() => setState("register")} className="text-primary cursor-pointer hover:underline">Ấn vào đây</span>
                            </p>
                        )}

                        <div className="grid grid-cols-1 w-full gap-4">
                            <button type="submit" className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer active:scale-90">
                                {state === "register" ? "Tạo tài khoản" : "Đăng nhập"}
                            </button>
                        </div>
                    </form>
                    : <form onSubmit={handleForgotPassword} ref={ref} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
                        <p className="text-2xl font-medium m-auto">
                            <span className="text-primary">Quên mật khẩu</span>
                        </p>
                        <div className="w-full">
                            <p>Email</p>
                            <input
                                onChange={(e) => setEmailForgot(e.target.value)}
                                value={emailForgot}
                                placeholder="Nhập địa chỉ email"
                                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                type="text"
                                required
                            />
                        </div>
                        <p>
                            Quay lại? <span onClick={() => setState("login")} className="text-primary cursor-pointer hover:underline">Ấn vào đây</span>
                        </p>
                        <button
                            type="submit"
                            className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer active:scale-90">
                            Gửi
                        </button>
                    </form>
            }
        </div>
    );
};

export default Login;