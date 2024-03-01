// Libraries
import { css } from '@emotion/css';
import React, { useState } from 'react';

// Components
import { GrafanaTheme2 } from '@grafana/data';
import { config } from '@grafana/runtime';
import { Alert, HorizontalGroup, LinkButton, useStyles2, Button } from '@grafana/ui';
import { Branding } from 'app/core/components/Branding/Branding';
import { t, Trans } from 'app/core/internationalization';

import { ChangePassword } from '../ForgottenPassword/ChangePassword';

import LoginCtrl from './LoginCtrl';
import { LoginForm } from './LoginForm';
import { LoginLayout, InnerBox } from './LoginLayout';
import { LoginServiceButtons } from './LoginServiceButtons';
import { UserSignup } from './UserSignup';

export const LoginPage = () => {
  const [radioValue, setRadioValue] = useState('user');

  const styles = useStyles2(getStyles);
  document.title = Branding.AppTitle;

  return (
    <LoginCtrl>
      {({
        loginHint,
        passwordHint,
        disableLoginForm,
        disableUserSignUp,
        login,
        isLoggingIn,
        changePassword,
        skipPasswordChange,
        isChangingPassword,
        showDefaultPasswordWarning,
        loginErrorMessage,
      }) => (
        <LoginLayout isChangingPassword={isChangingPassword}>
          {!isChangingPassword && ( // login radio group
            <fieldset style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <input
                  type="radio"
                  id="user"
                  value="user"
                  checked={radioValue === 'user'}
                  onChange={() => setRadioValue('user')}
                />
                <label htmlFor="user">user</label>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <input
                  type="radio"
                  id="administrator"
                  value="administrator"
                  checked={radioValue === 'administrator'}
                  onChange={() => setRadioValue('administrator')}
                />
                <label htmlFor="administrator">administrator</label>
              </div>
            </fieldset>
          )}
          <div className={styles.loginField}>
            {radioValue === 'user' && (
              <InnerBox>
                <Button
                  type="submit"
                  data-testid="n/a"
                  className={styles.submitButton}
                  disabled={isLoggingIn}
                  onClick={() => {
                    window.location.href = 'https://www.naver.com';
                  }}
                >
                  {isLoggingIn ? 'Logging in...' : 'Log in with 42 Auth'}
                </Button>
              </InnerBox>
            )}
            {radioValue === 'administrator' && !isChangingPassword && (
              <InnerBox>
                {loginErrorMessage && (
                  <Alert className={styles.alert} severity="error" title={t('login.error.title', 'Login failed')}>
                    {loginErrorMessage}
                  </Alert>
                )}
                {!disableLoginForm && (
                  <LoginForm
                    onSubmit={login}
                    loginHint={loginHint}
                    passwordHint={passwordHint}
                    isLoggingIn={isLoggingIn}
                  >
                    <HorizontalGroup justify="flex-end">
                      {!config.auth.disableLogin && (
                        <LinkButton
                          className={styles.forgottenPassword}
                          fill="text"
                          href={`${config.appSubUrl}/user/password/send-reset-email`}
                        >
                          <Trans i18nKey="login.forgot-password">Forgot your password?</Trans>
                        </LinkButton>
                      )}
                    </HorizontalGroup>
                  </LoginForm>
                )}
                <LoginServiceButtons />
                {!disableUserSignUp && <UserSignup />}
              </InnerBox>
            )}
            {isChangingPassword && (
              <InnerBox>
                <ChangePassword
                  showDefaultPasswordWarning={showDefaultPasswordWarning}
                  onSubmit={changePassword}
                  onSkip={() => skipPasswordChange()}
                />
              </InnerBox>
            )}
          </div>
        </LoginLayout>
      )}
    </LoginCtrl>
  );
};

const getStyles = (theme: GrafanaTheme2) => {
  return {
    forgottenPassword: css({
      padding: 0,
      marginTop: theme.spacing(0.5),
    }),

    alert: css({
      width: '100%',
    }),

    submitButton: css({
      justifyContent: 'center',
      width: '100%',
    }),

    loginField: css({
      display: 'flex',
      width: '80%',
      justifyContent: 'center',
    }),
  };
};
