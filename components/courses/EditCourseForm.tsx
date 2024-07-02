"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Course } from "@prisma/client";
import axios from "axios";
import router from "next/router";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComboBox } from "@/components/custom/ComboBox";
import toast from "react-hot-toast";

const formSchema = z.object({
	title: z.string().min(2, {
		message: "Title is required and minimum 2 characters",
	}),
	subtitle: z.string().optional(),
	description: z.string().optional(),
	categoryId: z.string().min(1, {
		message: "Category is required",
	}),
	subCategoryId: z.string().min(1, {
		message: "Subcategory is required",
	}),
	levelId: z.string().optional(),
	imageUrl: z.string().optional(),
	price: z.coerce.number().optional(),
});

interface EditCourseProps {
	course: Course
}

const EditCourseForm = ({ course }: EditCourseProps) => {

	const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title,
			subtitle: course.subtitle || "",
			description: course.description || "",
      categoryId: course.categoryId,
      subCategoryId: course.subCategoryId,
			levelId: course.levelId || "",
			imageUrl: course.imageUrl || "",
			price: course.price || undefined,
    },
  });

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // const response = await axios.put("/api/courses", values);
      // router.push(`/instructor/courses/${response.data.id}/basic`);
      toast.success("New Course Created");
    } catch (err) {
      console.log("Failed to create new course", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 mt-10"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									placeholder="Ex: Web Development for Beginners"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="subtitle"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subtitle</FormLabel>
							<FormControl>
								<Input
									placeholder="Ex: Become a Full-stack developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB and more!"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				
			</form>
		</Form>
  )
}

export default EditCourseForm