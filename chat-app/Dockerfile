# Image
FROM node:20-alpine3.20 
#  As build

# Set the working directory
# WORKDIR /usr/src/app
WORKDIR /app

# Copy package
COPY package.json package-lock.json ./


# Install dependencies 
RUN npm ci 

# Copy the project files into the working directory
COPY ./ ./

# Build the React app for production
# RUN npm run build

# Expose port 80 to allow access to the app
EXPOSE  3000

CMD [ "npm", "run", "dev" ]
# # ################################
# # #### PRODUCTION ENVIRONMENT ####
# # ################################

# # # Use the official NGINX image for production
# # FROM nginx:stable-alpine as production

# # # copy nginx configuration in side conf.d folder
# # COPY --from=build /usr/src/app/nginx /etc/nginx/conf.d

# # # Copy the build output from the dist folder into the Nginx html directory
# # COPY --from=build /usr/src/app/dist /usr/share/nginx/html



# # # Run Nginx in the foreground
# # ENTRYPOINT ["nginx", "-g", "daemon off;"] 


