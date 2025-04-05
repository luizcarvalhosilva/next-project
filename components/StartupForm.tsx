"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { z } from "zod";
import { formSchema } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

function StartupForm() {
    const [errors, setErrors] = useState<Record<string>>({});
    const [pitch, setPitch] = useState("");
    const { toast } = useToast();
    const router = useRouter();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch
            }
            await formSchema.parseAsync(formValues);

            const result = await createPitch(prevState, formData, pitch);
            if (result.status == "SUCCESS") {
                toast({
                    title: "Success", 
                    description: "Apresentação da startup criada com sucesso",
                })
                router.push(`/startup/${result._id}`);
            }
            return result;

        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>);
                toast({
                    title: "Error", 
                    description: "Favor, verificar entradas e tentar novamente.",
                    variant: "destructive"
                })
                return { ...prevState, error: "Validação falhou", status: "ERROR" }
            };
            toast({
                title: "Error", 
                description: "Favor, verificar entradas e tentar novamente.",
                variant: "destructive"
            })
            return {
                ...prevState, error: "Ocorreu um erro inesperado", status: "ERROR"
            };
        }
    };
    const [state, formAction, isPending] = useActionState(
        handleFormSubmit, { error: "", status: "INITIAL" }
    );

    return (
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">Título</label>
                <Input id="title" name="title" className="startup-form_input"
                    required placeholder="Título da Startup"
                />

                {errors.title && <p className="startup-form_error">{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className="startup-form_label">Descrição</label>
                <Textarea id="description" name="description" className="startup-form_textarea"
                    required placeholder="Descrição da Startup"
                />

                {errors.description && <p className="startup-form_error">{errors.description}</p>}
            </div>

            <div>
                <label htmlFor="category" className="startup-form_label">Categoria</label>
                <Input id="category" name="category" className="startup-form_input"
                    required placeholder="Categoria da Startup (ex: Saúde, tecnologia, etc.)"
                />

                {errors.category && <p className="startup-form_error">{errors.category}</p>}
            </div>

            <div>
                <label htmlFor="link" className="startup-form_label">URL da imagem</label>
                <Input id="link" name="link" className="startup-form_input"
                    required placeholder="Imagem da Startup"
                />

                {errors.link && <p className="startup-form_error">{errors.link}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">Apresentação</label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id="pitch" preview="edit" height={300}
                    style={{ borderRadius: 20, overflow: "hidden" }}
                    textareaProps={{
                        placeholder: "Descreva sua ideia brevemente. Qual problema ela resolve?"
                    }}
                    previewOptions={{
                        disallowedElements: ["style"]
                    }}
                />

                {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
            </div>

            <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
                {isPending ? "Salvando..." : "Salve sua apresentação."}
                <Send className="size-6 ml-1" />
            </Button>
        </form>
    );
}

export default StartupForm;