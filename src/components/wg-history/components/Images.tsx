interface IImages {
  images: string[];
}

export const Images = ({ images }: IImages) => (
  <div>
    {images.length !== 0 && (
      <h2 className="mt-[15px] mb-[10px] text-[30px]">Bilder</h2>
    )}
    <div className="flex flex-wrap max-h-[80vh] overflow-scroll rounded-xl">
      {images.map((a) => (
        <img
          key={a}
          className="my-[5px] mr-[10px] rounded-xl border border-black shadow-lg"
          src={a}
          alt={a}
        />
      ))}
    </div>
  </div>
);
