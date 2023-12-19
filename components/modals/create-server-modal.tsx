"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Community name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Community image is required.",
  }),
});

export const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "createServer";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/servers", values);

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="backdrop-blur-[130px] !w-auto !rounded-[28px] border border-white text-white p-[20px_35px] sm:p-[30px_60px] overflow-hidden">
        {/* <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image. You can always change it later.
          </DialogDescription>
        </DialogHeader> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-center text-center">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2 w-full ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="placeholder:text-foreground/20 bg-transparent border mx-auto h-[50px] max-w-[300px] text-center border-foreground/50 rounded-lg focus-visible:ring-0 text-foreground focus-visible:ring-offset-0"
                        placeholder="Community Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-normal text-center" />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-1 w-full">
                <Button
                  className="rounded-lg mx-auto hover:bg-[#40CACA] h-[50px] min-w-[300px] bg-[#50FFFF] text-black"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Icon
                      icon="line-md:loading-twotone-loop"
                      className="h-5 w-5 mr-3"
                    />
                  )}
                  <span>Create</span>
                </Button>
                <span className="text-[8px] text-center font-extralight">
                  You can add additional information in the community settings
                  after creation.
                </span>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
