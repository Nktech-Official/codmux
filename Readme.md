# CodeMux

![logo-transparent-bg](/assets/logo-transparent-bg.png)
A Video Player + Pdf + Html Viewer to watch Downloaded Courses and Series in Sequentiol Order.

## Features

- Play Video
- Preview Pdf Document's
- Preview Images
- Preview Html and Text Files'
- Add Subtitle to Video .

- ## Limitation
  - Depndent on Web Technology to Play Video
  - unable to play unsupported video encodings by chromium project.

#### Note :- This is to Preview and watch Videos not for pdf or html editing.

## Usage

- clone this repo .
  ```
  git clone https://github.com/nktech-official/codemux
  ```
- change Directory to codemux using
  ```
  cd  codemux
  ```
- Install Dependencies using `yarn` if don't have yarn install using `npm install --global yarn`.

  ```
  yarn install && yarn --cwd ./user-interface install
  ```

  OR

  ```
  yarn install
  ```

  ```
  cd ./user-interface
  yarn install
  cd ..
  ```

- Run dev environment using
  ```
  yarn dev
  ```
