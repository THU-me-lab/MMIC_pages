# 05 Signals

## 名词与概念

- 信号(signal)：表明物理量的变换，通常表示为一个关于 $t$ 的函数
- 噪声(noise)：信号中不被感兴趣的部分
- 信噪比(signal to noise ratio, SNR)：信号与噪声的比值

$$
\xi=\frac{P_s}{P_n}\\
\qquad where \quad  P_s = \int_{-\infty}^{\infty} s^2(t) dt \quad  P_n = \int_{-\infty}^{\infty} n^2(t) dt
$$
![图 0](images/%E4%BF%A1%E5%8F%B7%E5%88%86%E7%B1%BB.png)  

## 基本信号类型

- 常数信号：$s(t) = A$
- 单位阶跃信号：$s(t) = u(t)$
- 单位冲激信号：$s(t) = \delta(t)$
- 指数信号：$s(t) = Ke^{at}$
- 正弦信号：$s(t) = A\sin(\omega t + \phi)$
- 复指数信号（双曲信号）：$s(t) = K e^{(\sigma+j \omega)t}$

## 特殊信号的特性
