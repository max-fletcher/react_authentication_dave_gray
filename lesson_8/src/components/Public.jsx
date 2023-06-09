import { Link } from "react-router-dom"

const Public = () => {

   const content = (
      <section>
         <header className="public">
            <h1>Welcome to Repair Store</h1>
         </header>
         <main>
            <p>Located in some imaginary place in downtown, Repair store provides...wel... repairs(duh!)</p>
            <p>&nbsp;</p>
            <address>
               Repair Store<br />
               555 Foo Drive<br />
               Foo City, CA 12345<br />
               <a href="tel:+15555555555">(555) 555-5555</a>
            </address>
         </main>
         <footer>
            <Link to="/login">Employee Login</Link>
         </footer>
      </section>
   )

   return content
}

export default Public