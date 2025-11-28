FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# GitHub Actions will build a jar into s14backend/target/
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
