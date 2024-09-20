export default function PaintType({type}){
    return (
      <div className="PaintType col-sm-3 col-md-3 col-lg-2 col-xl-2">
        <button className="type mt-3 rounded-pill  p-3 text-center">
          {type}
        </button>
      </div>
    );
}