interface IImages {
  images: string[];
}

export const Images = ({ images }: IImages) => (
  <div>
    <h2 className="mb-2 text-2xl">Bilder</h2>
    <div className="grid grid-cols-2 max-h-[80vh] overflow-y-scroll rounded-xl bg-gray-700 p-2">
      {images.map((a) => (
        <img
          key={a}
          className="object-cover w-full h-auto border border-black shadow-lg aspect-square"
          src={a}
          alt={a}
        />
      ))}
    </div>
  </div>
);
