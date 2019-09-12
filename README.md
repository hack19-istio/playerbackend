# Hack19Istio player backend
This project is part of the result of the 2019 hackathon about istio.
The setup includes a ui component, where a few instruments can be selected.
The player backend provides the instrument files + provides access to the
instrument microservices (each instrument is deployed in one or more versions).

- [Ui component](https://github.com/hack19-istio/ui)
- [Micro services](https://github.com/hack19-istio/instrument) 

#Run the player backend
- `npm install`
- `npm run start`

#Development
- if you would like to use the mock, provide a mock service, which fits the configuration in `.env`
  - There is a soapui project including a mock service in the [soapui](./soapui) subdirectory
- `npm install`
- `npm run dev` -> will reload on code change
- call `http://localhost:3000/instrument-file/name=bass1` (file download)
- call `http://localhost:3000/instrument/name=bass` (read instrument from microservice)
