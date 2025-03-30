import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <p>Podróba strony <b>Bookiong.com</b>, wita na stronie głównej.</p>
      Mamy zaszczyt zabrać państwa do w podróż po rezerwacjach sztucznych terminów w wymyślonych hotelach. Jeśli nie macie pieniędzy to świetnie się składa bo tutaj nic nie zapłacicie i nic nie dostaniecie, za to możecie się poczuć jakbyście jechali na drogie wakacje i wybrac nocelg w <i>przepłaconych hotelach.</i>
      <p><Button className="text-blue-900" onClick={() => { navigate("/login") }}>Przejdź do strony logowania</Button></p>
    </div>
  );
}