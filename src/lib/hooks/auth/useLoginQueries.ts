import { useMutation } from "@tanstack/react-query";
import { LoginFormValues } from "@/lib/validations/auth.schema";
import { authService } from "@/lib/services/auth.service";
import { toast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/lib/stores/auth.store";


export function useLogin() {
    const setAuth = useAuthStore((state) => state.setAuth)
    return useMutation({
        mutationFn: (data: LoginFormValues) => authService.login(data),
        onSuccess : (data) => {
            toast({
                title: "Success",
                description: "User Login successfully"
            })
            setAuth(data)
        },
        onError : (error:any) => {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to register the user",
                variant: 'destructive'
            })
        }
    })
}

