import AuthorForm from "@/app/components/forms/AuthorForm";




const author = {
  id: "1",
  name: "Albert Camus",
  country: "France",
  birthDate: "1913-11-07",
  bio: "French philosopher and writer",
};

export default function EditAuthorPage() {
  const handleUpdate = async (data: any) => {
    console.log("Update Author:", data);
    // API call here
  };

  return <AuthorForm initialData={author} onSubmit={handleUpdate} />;
}