import { Container } from "../../../components/Container";
import { Input } from "../../../components/Input";
import { TopBar } from "../../../components/TopBar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "../../../components/Card";
import { Button } from "../../../components/Button";
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";

const schema = z.object({
  title: z.string().nonempty("Coloque nome no produto"),
  price: z.string().nonempty("Coloque o preço sugerido"),
  description: z.string().nonempty("Campo descrição e obrigatório"),
  imagenURL: z.string().nonempty("Imagen do produto obrigatória"),
});

type FormProduct = z.infer<typeof schema>;

export function NewProduct() {
  const [showInput, setShowInput] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormProduct>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function handleAddProduct(data: FormProduct) {
    console.log(data);
  }

  function handleOption() {
    setShowInput(true);
  }

  const imageUrl = watch("imagenURL");

  return (
    <Container>
      <TopBar />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        <Card button>
          {imageUrl && (
            <img
              src={imageUrl}
              alt=""
              className="object-cover max-h-60 rounded-2xl"
            />
          )}

          <button className="absolute top-0 right-0 bg-orange-500 hover:bg-orange-600 duration-300 p-4 rounded-bl-4xl">
            <FaPlusCircle className="text-white text-3xl  " />
          </button>
          <input
            type="text"
            placeholder="Coloque aqui o link da imagem aqui"
            {...register("imagenURL", { required: true })}
            name="imagenURL"
            className="w-[95%] absolute input-custom bottom-1"
          />
        </Card>
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
            <p className="">{errors.title?.message}</p>
          </div>
          <Button className="w-full">Salvar</Button>
        </form>
      </section>
    </Container>
  );
}
