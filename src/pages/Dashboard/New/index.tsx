import { Container } from "../../../components/Container";
import { Input } from "../../../components/Input";
import { TopBar } from "../../../components/TopBar";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "../../../components/Card";
import { Button } from "../../../components/Button";

import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
// import { v4 as uuidV4 } from "uuid";
// import {
//   uploadBytes,
//   getDownloadURL,
//   ref,
//   deleteObject,
// } from "firebase/storage";
import { db } from "../../../services/firebaseConnection";

import { IoRemoveCircleSharp } from "react-icons/io5";
import { addDoc, collection } from "firebase/firestore";

const schema = z.object({
  title: z.string().nonempty("Adicione um nome no produto"),
  price: z.number().min(3, "Nunhuma preço adicionada"),
  description: z.string().nonempty("Nunhuma descrição adicionada"),
  images: z
    .array(
      z.object({
        url: z.string().url("URL da imagen inválida").min(1, "Informe a url"),
      }),
    )
    .nonempty("Adicone pelo menos 1 url de imagem"),
});

type FormProduct = z.infer<typeof schema>;

// interface ImageProductProps {
//   uid: string;
//   name: string;
//   prewiewUrl: string;
//   url: string;
// }

export function NewProduct() {
  const { user } = useContext(AuthContext);
  // const [productImages, setProductImages] = useState<ImageProductProps[]>([]);
  // const [imagenURL, setImagenURL] = useState<string | null>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm<FormProduct>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      images: [{ url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });
  const images = watch("images");

  console.log("fileds", fields);

  // async function handleFile(e: ChangeEvent<HTMLInputElement>) {
  //   if (e.target.files && e.target.files[0]) {
  //     const image = e.target.files[0];
  //     console.log(image);

  //     if (image.type === "image/jpeg" || image.type === "image/png") {
  //       await uploadImage(image);
  //     } else {
  //       alert("Envie uma imagem no formato jpeg ou png!");
  //       return;
  //     }
  //   }
  // }

  // async function uploadImage(image: File) {
  //   if (!user?.uid) {
  //     return;
  //   }

  //   const userUid = user?.uid;
  //   const imageUid = uuidV4();

  //   const uploadRef = ref(storage, `images/${userUid}/${imageUid}`);

  //   uploadBytes(uploadRef, image).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((downloadUrl) => {
  //       const imageProduct = {
  //         name: imageUid,
  //         uid: userUid,
  //         previewUrl: URL.createObjectURL(image),
  //         url: downloadUrl,
  //       };

  //       setProductImages((images) => [...images, imageProduct]);
  //     });
  //   });
  // }

  async function handleAddProduct(data: FormProduct) {
    if (images.length === 0) {
      alert("Não foi preechido todos campos");
      return;
    }

    const imageUrls = data.images
      .map((img) => img.url)
      .filter((url) => url !== "");

    addDoc(collection(db, "products"), {
      title: data.title,
      price: data.price,
      description: data.description,
      images: imageUrls,
      createdAt: new Date(),
      uid: user?.uid,
    })
      .then(() => {
        console.log("CADASTRADO COM SUCESSO!");
        reset();
      })
      .catch((error) => {
        console.log(error);
        console.log("ERRO AO CADASTRAR NO BANCO");
      });
  }

  return (
    <Container>
      <TopBar />
      <Card>
        <div className="flex max-h-60">
          {images?.map((img, i) =>
            img.url ? (
              <img
                key={i}
                src={img.url}
                className="max-h-60 object-cover rounded"
              />
            ) : (
              <div className="flex justify-center items-center h-60">
                <p className="font-bold text-zinc-800">
                  Nenhuma URL foto adicionada
                </p>
              </div>
            ),
          )}
        </div>

        {/* <button className="cursor-pointer absolute flex top-0 right-0 bg-orange-500 hover:bg-orange-600 duration-300 p-4 rounded-bl-4xl">
            <ImCloudUpload className="text-white text-3xl cursor-pointer  " />
            <div className="absolute opacity-0 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="w-50 h-50 cursor-pointer"
                onChange={handleFile}
              />
            </div>
          </button> */}
      </Card>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        <div className=" flex flex-col gap-1   bottom-1">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <div className="w-full">
                <input
                  type="text"
                  placeholder={`URL DA IMAGEM ${index + 1}`}
                  {...register(`images.${index}.url` as const)}
                  className=" input-custom w-full"
                />
                <p className="text-red-700 text-xs">{errors.images?.message}</p>
              </div>

              <button
                type="button"
                className="bg-orange-500 rounded-full p-2"
                onClick={() => remove(index)}
              >
                <IoRemoveCircleSharp className="text-white text-4xl" />
              </button>
            </div>
          ))}

          <Button onClick={() => append({ url: "" })} className="text-center">
            ADICIONAR MAIS URL
          </Button>
        </div>
        <form
          onSubmit={handleSubmit(handleAddProduct)}
          className="flex flex-col w-full max-w-3xl gap-2.5"
        >
          <div>
            <label htmlFor="" className="text-zinc-800 font-medium">
              Produto
            </label>
            <Input
              type="text"
              name="title"
              register={register}
              error={errors.title?.message}
              placeholder="Digite nome do protudo"
            />
          </div>
          <div>
            <label htmlFor="" className="text-zinc-800 font-medium">
              Preço
            </label>
            <Input
              type="text"
              name="price"
              register={register}
              error={errors.price?.message}
              placeholder="Ex. 10,00"
            />
          </div>
          <div>
            <label htmlFor="" className="text-zinc-800 font-medium">
              Descrição
            </label>
            <textarea
              {...register("description")}
              name="description"
              id="description"
              placeholder="Digite nome do protudo"
              className="input-custom"
            ></textarea>
            <p className="text-red-700 text-xs">
              {errors.description?.message}
            </p>
          </div>
          <Button className="w-full">Salvar</Button>
        </form>
      </section>
      <div className="grid grid-cols-4"></div>
    </Container>
  );
}
