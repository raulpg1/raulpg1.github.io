searchNodes=[{"doc":"EJEMPLOS Ejemplo 1:iex(1)&gt; list = [1,2,3,4,5,6] iex(2)&gt; comp1 = for x &lt;- (list ++ [99]), do: (x - 1) + 100 [100, 101, 102, 103, 104, 105, 198] Ejemplo 2:iex(3)&gt; comp2 = for {key,val} &lt;- %{&quot;Key1&quot;=&gt;&quot;Val1&quot;,&quot;Key2&quot;=&gt;&quot;Val2&quot;}, do: key&lt;&gt;&quot;-&gt;&quot;&lt;&gt;val [&quot;Key1-&gt;Val1&quot;, &quot;Key2-&gt;Val2&quot;] Ejemplo 3:iex(4)&gt; comp3 = for n &lt;- 1..3, times &lt;- 1..n, do: {n,times} [{1, 1}, {2, 1}, {2, 2}, {3, 1}, {3, 2}, {3, 3}] Ejemplo 4: Comprensión con Filtrosiex(5)&gt; comp4 = for x &lt;- 1..1000, rem(x,7)==0,x&lt;100, do: x [7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98]","ref":"Comprensiones.html","title":"Comprensiones","type":"module"},{"doc":"EJEMPLOS Ejemplo 1: Evaluar una funcion de manera asíncronaiex(1)&gt; defmodule ModuloEjemplo do ...(1)&gt; def mult(op1,op2) do ...(1)&gt; IO.puts(op1*op2) ...(1)&gt; end ...(1)&gt; end iex(2)&gt; spawn(ModuloEjemplo, :mult, [2, 3]) 6 #PID&lt;0.117.0&gt; Ejemplo 2: Enlace de procesosiex(3)&gt; defmodule EjemploEnlaceProcesos do ...(3)&gt; def bye, do: exit(&quot;ESTA ES LA RAZON POR LA QUE HEMOS SALIDO&quot;) ...(3)&gt; def run do ...(3)&gt; Process.flag(:trap_exit, true) ...(3)&gt; spawn_link(EjemploEnlaceProcesos, :bye, []) ...(3)&gt; receive do ...(3)&gt; {:EXIT, from_pid, reason} -&gt; IO.puts(&quot;spawn_link: terminado por la razon: &quot; &lt;&gt; reason) ...(3)&gt; end ...(3)&gt; end ...(3)&gt; end iex(4)&gt; EjemploEnlaceProcesos.run spawn_link: terminado por la razon: ESTA ES LA RAZON POR LA QUE HEMOS SALIDO Ejemplo 3: Spawn_monitor para comunica procesos sin utilizar enlace (link)iex(5)&gt; defmodule EjemploSinEnlaceProcesos do ...(5)&gt; def bye, do: exit(&quot;ESTA ES LA RAZON POR LA QUE HEMOS SALIDO&quot;) ...(5)&gt; def run2 do ...(5)&gt; {pid, ref} = spawn_monitor(EjemploEnlaceProcesos, :bye, []) ...(5)&gt; receive do ...(5)&gt; {:DOWN, ref, :process, from_pid, reason} -&gt; IO.puts(&quot;spawn_monitor: terminado por la razon: &quot; &lt;&gt; reason) ...(5)&gt; end ...(5)&gt; end ...(5)&gt; end iex(6)&gt; EjemploSinEnlaceProcesos.run2 spawn_monitor: terminado por la razon: ESTA ES LA RAZON POR LA QUE HEMOS SALIDO :ok Ejemplo 4: Agentesiex(7)&gt; tuple = {&quot;val1&quot;, 2, &quot;val3&quot;} iex(8)&gt; {:ok, agent} = Agent.start_link(fn -&gt; (tuple) end) iex(9)&gt; Agent.update(agent,fn({a,b,c})-&gt;{c,a,b} end) :ok iex(10)&gt; Agent.get(agent, &amp;(&amp;1)) {&quot;val3&quot;, &quot;val1&quot;, 2} Ejemplo 5: Tareasiex(11)&gt; defmodule EjemploTarea do ...(11)&gt; def func(x,y) do ...(11)&gt; IO.puts(&quot;Vamos a esperar 2 segundos para calcular el res:&quot;) ...(11)&gt; :timer.sleep(2000) ...(11)&gt; x * y ...(11)&gt; end ...(11)&gt; end iex(12)&gt; Task.await(Task.async(EjemploTarea, :func, [2,4])) #wait 2 sec 8","ref":"Concurrencia.html","title":"Concurrencia","type":"module"},{"doc":"EJEMPLOS Ejemplo 1: Enum.alliex(1)&gt; bool = Enum.all?([50, 20, 10], fn(s) -&gt; s &gt;= 15 end) false iex(2)&gt; bool = Enum.all?([1==1, true, &quot;x&quot;==&quot;x&quot;], fn(s) -&gt; s &gt;= 15 end) true Ejemplo 2: Enum.anyiex(3)&gt; bool = Enum.any?([50, 20, 10], fn(s) -&gt; s &gt;= 15 end) true iex(4)&gt; bool = Enum.any?([true, 3, 10], fn(s) -&gt; s &gt;= 15 end) true Ejemplo 3: Chunk_byiex(5)&gt; bool = Enum.chunk_by([&quot;uno&quot;, &quot;dos&quot;, &quot;tres&quot;, &quot;cuatro&quot;, &quot;cinco&quot;, &quot;cien&quot;],fn(x) -&gt; String.length(x) end) [[&quot;uno&quot;, &quot;dos&quot;], [&quot;tres&quot;], [&quot;cuatro&quot;], [&quot;cinco&quot;], [&quot;cien&quot;]] Ejemplo 4: Mapiex(6)&gt; list = Enum.map([0, 1, 2, 3], fn(x) -&gt; x - 1 end) [-1, 0, 1, 2] Ejemplo 5: Filteriex(7)&gt; list = Enum.filter([1, 2, 3, 4], fn(x) -&gt; rem(x, 2) == 1 end) [1, 3] Ejemplo 6: Miniex(8)&gt; lista = Enum.min([1,2,3,4,1]) [4, :atomo, &quot;Hola&quot;] Ejemplo 7: Maxiex(9)&gt; lista = Enum.max([9,2,3,4,2]) 9 Ejemplo 8: Reduceiex(10)&gt; lista = Enum.reduce([5,3,1],-7, fn(numero,contador) -&gt; numero*contador end) -105 Ejemplo 9: Sortiex(11)&gt; lista = Enum.sort([:ok,:okkkkkk,2,3,5]) [2, 3, 5, :ok, :okkkkkk]","ref":"Enum_.html","title":"Enum_","type":"module"},{"doc":"EJEMPLOS Ejemplo 1: If elseiex&gt; if nil do ...&gt; &quot;Nunca se ejecutará este sentencia&quot; ...&gt; else ...&gt; &quot;Acierto&quot; ...&gt; end Ejemplo 2: Unlessiex&gt; unless true do ...&gt; &quot;Nunca se ejecutará esta sentencia&quot; ...&gt; end Ejemplo 3: Case statementiex&gt; testvalue = 500 iex&gt; case testvalue do ...&gt; 200 -&gt; true ...&gt; 404 -&gt; true ...&gt; _ -&gt; false ...&gt; end false Ejemplo 4: Case con guardiasiex&gt; case {1, 2, 3} do ...&gt; {1, x, 3} when x &gt; 0 -&gt; ...&gt; &quot;Correcto&quot; ...&gt; _ -&gt; ...&gt; &quot;Falso&quot; ...&gt; end &quot;Correcto&quot; Ejemplo 5: Condiex&gt; cond do ...&gt; 2*3 == 8 -&gt; &quot;Esto es falso&quot; ...&gt; String.lenght(&quot;hola&quot;) == 6 -&gt; &quot;Esto también&quot; ...&gt; true -&gt; &quot;Ninguna condición es cierta&quot; ...&gt; end &quot;Ninguna condición es cierta&quot; Ejemplo 6: Withiex&gt; with {:ok, nombre} &lt;- Map.fetch(user, :nombre), iex&gt; {:ok, apellido} &lt;- Map.fetch(user, :apellido), iex&gt; do: apellido &lt;&gt; &quot;, &quot; &lt;&gt; nombre","ref":"Estructuras_control.html","title":"Estructuras_control","type":"module"},{"doc":"Función mostrar nombre con withParámetrosuser: Mapa que contiene nombre y apellidoExamplesiex(1)&gt; user = %{nombre: &quot;Ignacio&quot;, apellido: &quot;Pascual&quot;} %{nombre: &quot;Ignacio&quot;, apellido: &quot;Pascual&quot;} iex(2)&gt; Estrucutras_control.mostrar_usuario(user) &quot;Pascual, Ignacio&quot;","ref":"Estructuras_control.html#mostrar_usuario/1","title":"Estructuras_control.mostrar_usuario/1","type":"function"},{"doc":"EJEMPLOS Ejemplo 1: Versión no reducidaiex(1)&gt; listToTuple = fn ([a,b]) -&gt; {a,b} end iex(2)&gt; listToTuple.([&quot;elem1&quot;,&quot;elem2&quot;]) {&quot;elem1&quot;, &quot;elem2&quot;} Ejemplo 2: Versión reducida de la funcióniex(2)&gt; suma = &amp; (&amp;1+&amp;2) iex(3)&gt; suma.(2,4) 6 iex(4)&gt; pasaTupla = &amp;({&amp;1,&amp;2}) iex(5)&gt; pasaTupla.(&quot;1er elemento&quot;,&quot;2do elemento&quot;) {&quot;1er elemento&quot;, &quot;2do elemento&quot;}","ref":"Funciones_Anonimas.html","title":"Funciones_Anonimas","type":"module"},{"doc":"EJEMPLOS Ejemplo 1: Declaración de una listaiex(1)&gt; list = [3, 4, :atomo, &quot;Hola&quot;] [3, 4, :atomo, &quot;Hola&quot;] Ejemplo 2: Añadir elementos al principio de la listaiex(2)&gt; [&quot;Nuevo elemento&quot; | list] [&quot;Nuevo elemento&quot;, 3, 4, :atomo, &quot;Hola&quot;] Ejemplo 3: Concatenacion de listasiex(3)&gt; list = list ++ [&quot;Elem1&quot;, &quot;Elem2&quot;] [3, 4, :atomo, &quot;Hola&quot;, &quot;Elem1&quot;, &quot;Elem2&quot;] iex(4)&gt; list = list ++ [&quot;Elemento final&quot;] [3, 4, :atomo, &quot;Hola&quot;, &quot;Elem1&quot;, &quot;Elem2&quot;, &quot;Elemento final&quot;] Ejemplo 4: Sustraccion de listas (utilizando comparación estricta)iex(5)&gt; lista = [ 3, 4, :atomo, &quot;Hola&quot;] -- [3,4] [:atomo, &quot;Hola&quot;] iex(6)&gt; lista = [ 3, 4.154] -- [3, 4] [4.154] Ejemplo 5: Funciones Head y Tailiex(7)&gt; lista = hd [ 3, 4, :atomo, &quot;Hola&quot;] 3 iex(8)&gt; lista = tl [ 3, 4, :atomo, &quot;Hola&quot;] [4, :atomo, &quot;Hola&quot;]","ref":"Listas.html","title":"Listas","type":"module"},{"doc":"EJEMPLOS Ejemplo 1: Manejo de errores con try..rescueiex(1)&gt; try do ...(1)&gt; #raise ArgumentError, message: &quot;ERROR EN LA INICIALIZACION.&quot; ...(1)&gt; raise &quot;ESTE ES EL ERROR DE RUNTIME&quot; ...(1)&gt; rescue ...(1)&gt; error1 in ArgumentError -&gt; IO.puts(&quot;Ocurrio un error: &quot;&lt;&gt; error1.message) ...(1)&gt; error2 in RuntimeError -&gt; IO.puts(&quot;Error de Runtime: &quot;&lt;&gt; error2.message) ...(1)&gt; end Error de Runtime: ESTE ES EL ERROR DE RUNTIME Ejemplo 2: Manejo de errores con Afteriex(2)&gt; try do ...(2)&gt; raise ArgumentError, message: &quot;ERROR EN LA INICIALIZACION.&quot; ...(2)&gt; rescue ...(2)&gt; error1 in ArgumentError -&gt; IO.puts(&quot;Ocurrio un error: &quot;&lt;&gt; error1.message) ...(2)&gt; after ...(2)&gt; IO.puts &quot; - Sentencia que se ejecuta despues del manejo del error - &quot; ...(2)&gt; end Ocurrio un error: ERROR EN LA INICIALIZACION. - Sentencia que se ejecuta despues del manejo del error - Ejemplo 3: Creacion de nuestro propio erroriex(3)&gt; defmodule MiError do ...(3)&gt; defexception message: &quot;Este es el mensade de mi error&quot; ...(3)&gt; end ...(3)&gt; try do ...(3)&gt; raise MiError ...(3)&gt; rescue ...(3)&gt; error in MiError -&gt; IO.inspect error ...(3)&gt; end %MiError{message: &quot;Este es el mensade de mi error&quot;} Ejemplo 4: Manejo de errores con Try..Catchiex(4)&gt; try do ...(4)&gt; for x &lt;- [1,3,4,5,99,6,7,8] do ...(4)&gt; if (x == 99), do: throw(x) ...(4)&gt; end ...(4)&gt; catch ...(4)&gt; x -&gt; IO.puts &quot;Capturado el elemento: \#{x}&quot; ...(4)&gt; end Capturado el elemento: 99 Ejemplo 5: Utilizacion de Exitiex(5)&gt; try do ...(5)&gt; exit &quot;mensaje de error de la salida&quot; ...(5)&gt; catch ...(5)&gt; :exit, _ -&gt; IO.puts &quot;ERROR DE LA SALIDA&quot; ...(5)&gt; end ERROR DE LA SALIDA","ref":"Manejo_Errores.html","title":"Manejo_Errores","type":"module"},{"doc":"EJEMPLOS Ejemplo 1: Creación de un mapa.iex(1)&gt; persona = %{ :name ==&gt; &quot;Jose&quot; } %{name: &quot;Jose&quot;} Ejemplo 2: Cambiar el contenido de un mapa.iex(2)&gt; persona = %{persona | :name ==&gt; &quot;Manolo&quot; } %{name: &quot;Manolo&quot;} Ejemplo 3: Map.putiex(3)&gt; persona = Map.put(persona, :apellido, &quot;Jaime&quot;) %{apellido: &quot;Jaime&quot;, nombre: &quot;Manolo&quot;} iex(4)&gt; persona = Map.put_new(persona, :nombre, &quot;Alberto&quot;) %{apellido: &quot;Jaime&quot;, nombre: &quot;Manolo&quot;} iex(5)&gt; persona = Map.put_new(persona, :edad, 38) %{apellido: &quot;Jaime&quot;, edad: 15, nombre: &quot;Manolo&quot;} Ejemplo 4: Map.getiex(6)&gt; Map.get m, :nombre &quot;Manolo&quot; Ejemplo 5: Map.deleteiex(7)&gt; Map.delete m, :nombre %{apellido: &quot;Jaime&quot;, edad: 15} Ejemplo 6: map_sizeiex(8)&gt; map_size persona 3 Ejemplo 7: Map.keysiex(9)&gt; Maps.keys persona [:apellido, :edad]","ref":"Mapas.html","title":"Mapas","type":"module"},{"doc":"EJEMPLOSdefmodule AsignarError do def ass(&quot;&quot;) do {:error,&quot;No se ha asignado valor&quot;} end def ass(v) do {:ok,&quot;El valor asignado es -&gt;&quot;,v} end end iex(4)&gt; &quot;&quot; |&gt; AsignarError.ass() {:error, &quot;No se ha asignado valor&quot;} iex(5)&gt; string = case (27 |&gt; AsignarError.ass()) do ...(5)&gt; {:ok, &quot;El valor asignado es -&gt;&quot;, 27} -&gt; &quot;El valor asignado es -&gt; 27&quot; ...(5)&gt; {:error,&quot;No se ha asignado valor&quot;} -&gt; &quot;es el valor asociado a&quot; ...(5)&gt; end iex(6)&gt; string |&gt; String.upcase() |&gt; String.split() [&quot;EL&quot;, &quot;VALOR&quot;, &quot;ASIGNADO&quot;, &quot;ES&quot;, &quot;-&gt;&quot;, &quot;27&quot;]","ref":"Operador_Pipe.html","title":"Operador_Pipe","type":"module"},{"doc":"EJEMPLOS Ejemplo 1: Ejemplo simple con Stringsiex(1)&gt; &quot;Nombre&quot; &lt;&gt; apellido = &quot;Nombre Apellido&quot; &quot;Apellido&quot; Ejemplo 2: Ejemplo simple con Listasiex(2)&gt; list = [1,2,3,4] iex(3)&gt; [1,2|tail] = list [3,4] Ejemplo 3: Avanzadodefmodule AsignarError do def ass(&quot;&quot;) do {:error,&quot;No se ha asignado valor&quot;} end def ass(v) do {:ok,&quot;El valor asignado es -&gt;&quot;,v} end end iex(4)&gt; valor = 27 iex(5)&gt; res1 = case AsignarError.ass(valor) do ...(5)&gt; {:error,&quot;No se ha asignado valor&quot;} -&gt; {-1,&quot;es el valor asociado a&quot;,valor} ...(5)&gt; {:ok,&quot;El valor asignado es -&gt;&quot;,valor} -&gt; {9999999,&quot;es el valor asociado a&quot;,valor} ...(5)&gt; end {9999999, &quot;es el valor asociado a&quot;, 27} iex(6)&gt; valor = &quot;&quot; ...(6)&gt; res2 = case AsignarError.ass(valor) do ...(6)&gt; {:error,&quot;No se ha asignado valor&quot;} -&gt; {-1,&quot;es el valor asociado a&quot;,valor} ...(6)&gt; {:ok,&quot;El valor asignado es -&gt;&quot;,valor} -&gt; {9999999,&quot;es el valor asociado a &quot;,valor} ...(6)&gt; end {-1, &quot;es el valor asociado a&quot;, &quot;&quot;}","ref":"Pattern_Matching.html","title":"Pattern_Matching","type":"module"},{"doc":"Introducción","ref":"Project.html","title":"Project","type":"module"},{"doc":"Operador '==='Parámetrosv1: Variable a comparar número 1 (Integer)v2: Variable a comparar número 2 (Double)Examplesiex(1)&gt; entero_ = 5 iex(2)&gt; double_ = 5.0 iex(3)&gt; entero_ == double_ true iex(4)&gt; Project.comparacion_estricta(entero_, double_) false","ref":"Project.html#comparacion_estricta/2","title":"Project.comparacion_estricta/2","type":"function"},{"doc":"Comparación de variables de distintos tipos.Parámetrosv1: Variable a comparar número 1 (cualquier tipo)v2: Variable a comparar número 2 (cualquier tipo)Examplesiex(1)&gt; numero = 1 iex(2)&gt; atomo = :booiex(3)&gt; Project.comparador_tipos(numero, atomo) &quot;La variable v1: 1 es menor que v2: :boo&quot; iex(4)&gt; tupla = {1,2,3} iex(5)&gt; Project.comparador_tipos(atomo, tupla) &quot;La variable v1: :boo es menor que v2: {1, 2, 3}&quot;","ref":"Project.html#comparador_tipos/2","title":"Project.comparador_tipos/2","type":"function"},{"doc":"Hello WorldParámetrosname: String que representa el nombre de la personaExamplesiex&gt; Project.hello(&quot;Ignacio&quot;) &quot;Hola, Ignacio&quot;","ref":"Project.html#hello/1","title":"Project.hello/1","type":"function"},{"doc":"Función: Son anagramas. Dadas dos cadenas devuelve true si son anagramas, false en otro caso.Parámetross1: Strings2: StringExamplesiex(1)&gt; Project.son_anagramas(&quot;ana&quot;, &quot;naa&quot;) true iex(2)&gt; Project.son_anagramas(&quot;ana&quot;, &quot;nAa&quot;) true iex(3)&gt; Project.son_anagramas(&quot;ana&quot;, &quot;nva&quot;) false","ref":"Project.html#son_anagramas/2","title":"Project.son_anagramas/2","type":"function"},{"doc":"Función sort: Ordena una cadena, sustituyendo las letras mayúsculas por minúsculas. Output: Lista de caracteres ordenadas.Parámetrosst: StringExamplesiex(1)&gt; Project.sort_string(&quot;ignacio&quot;) [&quot;a&quot;, &quot;c&quot;, &quot;g&quot;, &quot;i&quot;, &quot;i&quot;, &quot;n&quot;, &quot;o&quot;] iex(2)&gt; Project.sort_string(&quot;IgnaciO&quot;) [&quot;a&quot;, &quot;c&quot;, &quot;g&quot;, &quot;i&quot;, &quot;i&quot;, &quot;n&quot;, &quot;o&quot;]","ref":"Project.html#sort_string/1","title":"Project.sort_string/1","type":"function"},{"doc":"EJEMPLOS Ejemplo 1: Sigilo que generan lista de caracteres.Es equivalente a encerrar un texto entre comillas simplesiex&gt; ~c/2 + 7 = 9/ &#39;2 + 7 = 9&#39; Ejemplo 2: Sigilo que genera listas de palabras.iex&gt; ~w/rojo azul verde/ [&quot;rojo&quot;, &quot;azul&quot;, &quot;verde&quot;] Ejemplo 3: Sigilos y regexiex&gt; Regex.run(~r/abc /, &quot;abc &quot;) [&quot;abc &quot;] iex(3)&gt;","ref":"Sigilos.html","title":"Sigilos","type":"module"},{"doc":"Creamos un sigilo simple que permite separar un String cuyo delimitador es el espacio. La salida es una lista de Strings.Parámetrosname: String para realizar el split.Examples iex&gt; ~j/hola mundo [&quot;hola&quot;, &quot;mundo&quot;]","ref":"Sigilos.html#sigil_j/1","title":"Sigilos.sigil_j/1","type":"function"}]