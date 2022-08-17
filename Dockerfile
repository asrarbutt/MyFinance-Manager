FROM openjdk:18

ENV ENVIRONMENT=prod

LABEL maintainer="asrarbutt1986@gmail.com"

ADD backend/target/myfinance-manager.jar myfinance-manager.jar

CMD [ "sh", "-c", "java -myfinanceimage.port=$PORT -jar /myfinance-manager.jar" ]