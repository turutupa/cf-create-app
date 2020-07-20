module.exports = function setupCompletedMessage() {
  console.log(
    '------------------------------------------------------------------------------'
  );
  console.log(`
                       Congratulations! 
                
                      You are set to go!

            Please read the documentation carefully if 
            you may have any doubts and please do not 
              hesitate to contact us if required

                    To start developing simply:
                        cd ${this.appName}
                        npm run dev

                        Happy hacking!
  `);
  console.log(
    '------------------------------------------------------------------------------'
  );
};
