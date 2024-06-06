import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Box, Container, Paper, Typography } from "@mui/material";

export default function App() {
  const [input, setInput] = useState<string>("");
  const [response, setResponse] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setResponse(json));
  }, []);

  const filteredTodos = response.filter((todo) =>
    todo.title.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <Container sx={{ color: "primary.main" }}>
      <Navbar input={input} setInput={setInput} />

      {response.length > 0 && (
        <Box sx={{ my: { xs: "56px", md: "64px" }, flexGrow: 1 }}>
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ py: 2, fontWeight: "bold" }}
          >
            List of Todos
          </Typography>
          {filteredTodos.length > 0 ? (
            <Box
              component="ul"
              sx={{
                p: 0,
                m: 0,
                listStyle: "none",
                display: "grid",
                gap: "30px",
                gridTemplateColumns: { md: "repeat(3, 1fr)" },
              }}
            >
              {filteredTodos.map((todo) => (
                <Box component="li" key={todo.id}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 4,
                      bgcolor: todo.completed ? "#90EE90" : "#FF817E",
                    }}
                  >
                    {todo.title}
                  </Paper>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ py: 2, fontWeight: "semibold" }}
            >
              No todos found matching title "{input}"
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
}
