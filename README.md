Struktura projektu - backend:
- Controllers:
	- AuthController.cs - kontroler uwierzytelniania i autoryzacji
	- ContactController.cs - kontroler dla kontaktów
- Data - dbContext + seeding
- Dto - dto (request i response w jednym): kontakty, logowanie, rejestracja
- Models - modele kontaktów, kategorii, użytkownika
- Services - serwis kontaktów

Struktura projektu - frontend:
- 2 serwisy: auth-service, contact-service
- guard do autoryzacji
- interceptor do requestów z Jwt
- komponenty do logowania, rejestracji, edycji kontaktów, tworzenia kontaktów, wyświetlania listy i szczegółów
- folder z dto

Zainstalowane pakiety NuGet:
- Microsoft.AspNetCore.Authentication.JwtBearer
- Microsoft.AspNetCore.Identity.EntityFrameworkCore
- Microsoft.AspNetCore.OpenApi
- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.InMemory
- Swashbuckle.AspNetCore
- System.IdentityModel.Tokens.Jwt

Instalacja i uruchamianie:
	Backend (.NET 8.0.400):
		- przejście do folderu projektu
		- dotnet run
		- korzysta z nietrwałej bazy danych typu in-memory
	Frontend (nodeJs v18.20.7):
		- przejście do folderu projektu
		- npm install - instalacja zależności
		- npm start / ng serve - uruchomienie serwera
	Dodatkowa opcjonalna konfiguracja:
		- Frontend / environments/environments.ts - url api backendu
		- Backend / appsettings.json - CORS + JWT
