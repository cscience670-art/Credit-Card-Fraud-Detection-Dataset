import AuthorForm from "@/app/components/forms/AuthorForm";


export default function EditAuthorPage() {
  const handleUpdate = async (data: any) => {
    console.log("Update Author:", data);
    // API call here
  };

  return <AuthorForm initialData={author} onSubmit={handleUpdate} />;
}
